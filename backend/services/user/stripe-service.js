import AppConfig from "../../config/app-config.js";
import Product from "../../models/product.js";
import User from "../../models/user.js";
import BaseService from "../base-service.js";

import Stripe from "stripe";

const stripe = new Stripe(AppConfig.stripeSecretKey, {
  apiVersion: "2025-08-27.basil",
});

class StripeService extends BaseService {
  async createCheckoutSession(data, userData) {
    try {
      const { items } = data; // [{ productId, quantity }]
      const { id } = userData;

      const user = await User.findById(id).lean();

      if (!user) {
        return this.handleResponse(400, false, "User not found!");
      }

      if (!Array.isArray(items) || items.length === 0) {
        return this.handleResponse(400, false, "No items provided!");
      }

      const productIds = items.map((item) => item.productId);

      const products = await Product.find({ _id: { $in: productIds } })
        .select("_id price")
        .lean();

      if (products.length <= 0) {
        return this.handleResponse(400, false, "Some products not found!");
      }

      let total = 0;
      const lineItems = items.map((item) => {
        const product = products.find(
          (p) => p._id.toString() === item.productId
        );
        const price = product?.price || 0;
        total += price * (item.quantity || 1);

        return {
          price_data: {
            currency: "usd",
            product_data: { name: `Product ${product.name}` },
            unit_amount: price * 100,
          },
          quantity: item.quantity,
        };
      });

      const deliveryCharge = total >= 100 ? 0 : 10;

      if (deliveryCharge > 0) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: { name: "Delivery Charge" },
            unit_amount: deliveryCharge * 100,
          },
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: user.stripeCustomerId,
        line_items: lineItems,
        success_url: `${AppConfig.frontendOrigin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${AppConfig.frontendOrigin}/checkout/cancel`,
      });

      return this.handleResponse(200, true, "Session created successfully!", {
        url: session.url,
      });
    } catch (err) {
      return this.handleError(err);
    }
  }

  async createUser(userName, email) {
    // checking if customer already exists
    const isAlreadyCustomer = await stripe.customers.list({ email });

    if (isAlreadyCustomer.data.length > 0) {
      const existingCustomerID = isAlreadyCustomer.data[0].id;

      return existingCustomerID;
    }

    const newCustomer = await stripe.customers.create({
      name: userName,
      email,
    });

    return newCustomer?.id;
  }
}

const stripeService = new StripeService();

export default stripeService;
