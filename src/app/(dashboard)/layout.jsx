// app/dashboard/layout.jsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Protect the route: If not loading and no user, redirect to login
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading)
    return <div className="p-10 text-center">Loading Dashboard...</div>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold">Control Panel</h2>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as: {user.data?.role || user?.role}
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {user.permissions?.map((group) => (
            <div key={group.id}>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.children?.map((child) => {
                  const isActive = pathname === child.route;
                  return (
                    <Link
                      key={child.id}
                      href={child.route}
                      className={`block px-3 py-2 rounded-md text-sm transition-all ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header inside Dashboard */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-gray-700">
            {pathname === "/dashboard" ? "Overview" : "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {user.data?.email || user.email}
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
              {(user.data?.name || "A").charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
