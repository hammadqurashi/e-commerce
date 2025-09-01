import { X, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { cartActions } from "@/store/cart";

export function CartSidebar() {
  const { items, isOpen, shipping, subtotal, total } = useSelector(
    (state: RootState) => state.cart
  );

  const dispatch = useDispatch();

  const toggleCartModal = (state: boolean) => {
    dispatch(cartActions.setIsOpen(state));
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCartModal}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="pb-6">
          <SheetTitle className="font-heading text-lg font-medium text-left">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button
              variant="outline"
              onClick={() => toggleCartModal(false)}
              className="font-body"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full p-2">
            <div className="flex-1 overflow-auto">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-body text-sm font-medium text-foreground leading-tight mb-1">
                        {item.product.name}
                      </h4>
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              dispatch(
                                cartActions.updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity - 1,
                                })
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-body text-sm w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              dispatch(
                                cartActions.updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body text-sm font-medium">
                            ${" "}
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                            onClick={() =>
                              dispatch(cartActions.removeItem(item.id))
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 pb-3 px-4 border-t mt-6">
              <div className="space-y-2 mb-4">
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

              <div className="flex flex-col gap-3">
                <Link to="/cart" onClick={() => toggleCartModal(false)}>
                  <Button className="w-full font-body">Checkout</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
