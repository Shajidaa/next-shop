"use client";
import useAuthStore from "@/context/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useThemeStore from "@/context/ThemeContext";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }) {
  const { user, loading, logout, _hasHydrated } = useAuthStore();
  const { theme, applyTheme, _hasHydrated: themeHydrated } = useThemeStore();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apply theme when hydrated
  useEffect(() => {
    if (themeHydrated) {
      applyTheme(theme);
    }
  }, [themeHydrated, theme, applyTheme]);

  // Protect the route: If hydrated, not loading and no user, redirect to login
  useEffect(() => {
    if (_hasHydrated && !loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router, _hasHydrated]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!_hasHydrated || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Topbar 
          user={user}
          pathname={pathname}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
