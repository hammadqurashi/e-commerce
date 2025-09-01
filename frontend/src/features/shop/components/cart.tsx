import { ChevronLeft, Heart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Separator } from "@/shared/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { cartActions } from "@/store/cart";

const Cart = () => {
  const dispatch = useDispatch();

  const { items, shipping, subtotal, total } = useSelector(
    (state: RootState) => state.cart
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="font-heading text-2xl font-medium mb-4">
            Your cart is empty
          </h1>
          <p className="font-body text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/">
            <Button className="font-body">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="flex items-center gap-2 mb-6">
        <ChevronLeft className="h-4 w-4" />
        <Link to="/" className="font-body text-sm hover:text-primary">
          Continue Browsing
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="font-heading text-2xl font-medium mb-6">
            Shopping Cart
          </h1>

          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0"
              >
                <div className="w-24 h-24 rounded-sm overflow-hidden bg-gray-50 flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-body text-sm font-medium text-foreground mb-1">
                        {item.product.name}
                      </h3>
                      {item.size && (
                        <p className="font-body text-xs text-muted-foreground mb-1">
                          Size: {item.size}
                        </p>
                      )}
                      {item.color && (
                        <div className="mb-1 ">
                          <div
                            className="rounded-full "
                            style={{
                              backgroundColor: item.color,
                              width: "16px",
                              height: "16px",
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label className="font-body text-xs text-muted-foreground">
                        Qty:
                      </label>
                      <Select
                        value={item.quantity.toString()}
                        onValueChange={(value) =>
                          dispatch(
                            cartActions.updateQuantity({
                              id: item.id,
                              quantity: parseInt(value),
                            })
                          )
                        }
                      >
                        <SelectTrigger className="w-16 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">
                        ${" "}
                        {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="link"
                    className="font-body text-xs p-0 h-auto mt-2 text-muted-foreground"
                    onClick={() => dispatch(cartActions.removeItem(item.id))}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-muted/50 rounded-sm p-6">
            <h2 className="font-heading text-lg font-medium mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between font-body text-sm">
                <span>Subtotal</span>
                <span>$ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span>Free Standard Delivery (3 working days)</span>
                <span>$ {shipping.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-body text-base font-medium">
                <span>Total</span>
                <span>$ {total.toLocaleString()}</span>
              </div>
              <p className="font-body text-xs text-muted-foreground">
                (Prices include VAT.)
              </p>
            </div>

            <Button className="w-full font-body bg-primary text-primary-foreground mb-4">
              Checkout
            </Button>

            <div className="space-y-3">
              <h3 className="font-body text-sm font-medium">Need Help?</h3>
              <div className="space-y-2">
                <Button
                  variant="link"
                  className="font-body text-xs p-0 h-auto justify-start"
                >
                  Delivery & Returns
                </Button>
                <Button
                  variant="link"
                  className="font-body text-xs p-0 h-auto justify-start"
                >
                  Gemstone Care
                </Button>
                <Button
                  variant="link"
                  className="font-body text-xs p-0 h-auto justify-start"
                >
                  Privacy Policy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
