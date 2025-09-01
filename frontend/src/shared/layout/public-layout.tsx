import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { CartSidebar } from "../components/cart-sidebar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
