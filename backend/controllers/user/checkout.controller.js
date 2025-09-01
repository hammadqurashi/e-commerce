import stripeService from "../../services/user/stripe-service.js";

const checkoutController = {
  createCheckoutSession: async (req, res) => {
    const { data, msg, status, success } =
      await stripeService.createCheckoutSession(req.body, req.user);

    return res.status(status).json({ success, msg, data });
  },
};

export default checkoutController;
