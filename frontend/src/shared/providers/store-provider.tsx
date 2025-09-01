import store from "@/store";
import React from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: React.PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
