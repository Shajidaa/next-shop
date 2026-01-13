// app/dashboard/layout.jsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Building2
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";

export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protect the route: If not loading and no user, redirect to login
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  console.log("User data:", user);
  console.log("User permissions:", user.permissions);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-50 w-72 bg-card/95 backdrop-blur-sm border-r border-border/50 
          transform transition-transform duration-300 ease-in-out md:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <Link href={'/'} className="text-lg font-bold text-foreground">Next Shop</Link>
                  <p className="text-xs text-muted-foreground">Control Panel</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center text-white font-semibold">
                {(user.name || user.username || user.email || "U").charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">
                  {user.name || user.username}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role || "Member"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Dashboard Overview */}
            <div>
              <Link
                href="/dashboard"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  pathname === "/dashboard"
                    ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">Overview</span>
                {pathname === "/dashboard" && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            </div>

            {/* Brands Management */}
            <div>
              <Link
                href="/brands"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  pathname.startsWith("/dashboard/brands")
                    ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span className="font-medium">Brands</span>
                {pathname.startsWith("/dashboard/brands") && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            </div>

          
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-all group"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
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
                  {pathname === "/dashboard" ? "Dashboard Overview" : "Dashboard"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Welcome back, {user.name || user.username || "User"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
