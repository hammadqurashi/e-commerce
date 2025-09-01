import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { CartSidebar } from "../components/cart-sidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { cookieService } from "@/core/services";
import { cartActions } from "@/store/cart";

const PublicLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = cookieService.get("cart");

    if (cart) {
      const parsedCart = JSON.parse(cart);

      dispatch(cartActions.setInitialCart(parsedCart));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
