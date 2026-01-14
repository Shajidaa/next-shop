"use client";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Topbar({ user, pathname, setSidebarOpen }) {
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard Overview";
    if (pathname === "/dashboard/addresses") return "My Addresses";
    if (pathname === "/dashboard/brands") return "Brands Management";
    return "Dashboard";
  };

  return (
    <header className="h-16 bg-card/80 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {getPageTitle()}
          </h1>
          <p className="text-xs text-muted-foreground">
            Welcome back, {user?.data?.name || user?.name || user?.username || "User"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
