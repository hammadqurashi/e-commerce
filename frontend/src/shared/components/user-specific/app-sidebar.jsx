"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import Logo from "../logo";
import { appSidebarOptions } from "@/core/constants";
import { DASHBOARD_ROUTE } from "@/core/routes";
import LogoutBtn from "@/features/account/components/logout-btn";

const MenuItem = ({ href = "", Icon, text = "", isSelected = false }) => (
  <Link
    href={href}
    className={`flex items-center gap-2 p-2 rounded-xl   ${
      isSelected
        ? "bg-primary text-white shadow-md"
        : "hover:bg-gray-100 text-gray-700 hover:text-accent "
    }`}
  >
    <div
      className={`${
        isSelected ? "bg-primary" : "bg-transparent"
      } w-[28px] h-[28px] flex items-center justify-center rounded-md`}
    >
      <Icon
        className={`text-lg ${isSelected ? "text-white" : "text-accent"} `}
      />
    </div>

    <p className="text-sm font-medium leading-5">{text}</p>
  </Link>
);

const Menu = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-1 xl:gap-3">
      {appSidebarOptions.map((item, i) => (
        <MenuItem
          {...item}
          Icon={item.icon}
          key={i}
          isSelected={pathName === item.href || pathName.includes(item.href)}
        />
      ))}
    </div>
  );
};

const AppSidebar = () => {
  return (
    <Sidebar className="px-3 pb-5">
      <SidebarHeader>
        <Logo href={DASHBOARD_ROUTE} isDark className="p-2" />
      </SidebarHeader>
      <SidebarContent className="custom-scrollbar py-3">
        <SidebarGroup className="h-full">
          <Menu />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-6">
          <LogoutBtn />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
