import { ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { cartActions } from "@/store/cart";
import { BtnLink } from "./ui/btn-link";

export function Header() {
  const {
    cart: { items },
    auth: { isLoggedIn },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const openCartModal = () => {
    dispatch(cartActions.setIsOpen(true));
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-heading text-xl font-medium text-brand">
            My Shop
          </Link>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={openCartModal}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            {isLoggedIn ? (
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
              </Button>
            ) : (
              <BtnLink href="/auth">Login</BtnLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
