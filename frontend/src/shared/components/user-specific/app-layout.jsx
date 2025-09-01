"use client";

import React from "react";
import AppSidebar from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

const AppLayout = ({ children }) => {
  return (
    <SidebarProvider className="2xl:max-w-[90%] mx-auto">
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-5">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
