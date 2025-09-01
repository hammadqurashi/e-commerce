import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import NotFound from "../public/not-found";

const CheckoutSuccess = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully
          processed.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white font-medium py-2 px-6 rounded-lg hover:bg-black/90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
