import React from "react";
import QueryProvider from "./query-provider";
import StoreProvider from "./store-provider";
import { Toaster } from "sonner";
import AuthProvider from "./auth-provider";

const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <StoreProvider>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </QueryProvider>
    </StoreProvider>
  );
};

export default RootProvider;
