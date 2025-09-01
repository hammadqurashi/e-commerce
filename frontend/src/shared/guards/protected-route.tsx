import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const role = useSelector((state: RootState) => state.auth.role);

  if (role !== "admin") {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
