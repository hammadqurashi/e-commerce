import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Package, Plus, Menu } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/core/lib/utils";

const navigation = [
  { name: "All Products", href: "/admin/products", icon: Package, count: 24 },
  { name: "Create Product", href: "/admin/products/create", icon: Plus },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-background border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Package className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold">Admin Panel</span>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex items-center">
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </div>
              {item.count && (
                <Badge variant="secondary" className="ml-auto">
                  {item.count}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden w-64 md:block">
          <SidebarContent />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
