"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
// import { useAuth } from "@/app/context/AuthContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  console.log(user);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">NextShop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* ১. Public Links (সবাই দেখতে পাবে) */}
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Products
            </Link>

            {/* ২. Private Dynamic Menu */}
            {user?.permissions && (
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>
            )}

            {/* ৩. User Section */}
            <div className="flex items-center space-x-4 border-l pl-6 ml-4">
              {!loading &&
                (user ? (
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-xs">
                      <p className="font-bold text-gray-900">
                        {user.data?.name || user.username || "Admin"}
                      </p>
                      <p className="text-gray-500">
                        {user.data?.email || user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 hover:bg-red-50 font-medium text-sm border border-red-100 px-3 py-1.5 rounded-lg transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-x-2">
                    <Link
                      href="/login"
                      className="text-gray-600 hover:text-blue-600 text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Register
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-4">
          {/* Public Mobile Links */}
          <Link
            href="/"
            className="block px-4 py-2 text-gray-700 font-bold bg-white rounded-md shadow-sm"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block px-4 py-2 text-gray-700 font-bold bg-white rounded-md shadow-sm"
          >
            Products
          </Link>

          {/* Private Mobile Permissions */}
          {user?.permissions?.map((item) => (
            <div key={item.id} className="space-y-2">
              <p className="font-bold text-gray-400 text-xs uppercase px-2 mt-4">
                {item.label}
              </p>
              {item.children?.map((child) => (
                <Link
                  key={child.id}
                  href={child.route}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 bg-white rounded-md shadow-sm text-sm"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="pt-4 border-t border-gray-200">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="block text-center bg-gray-200 text-gray-700 py-2 rounded-md font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block text-center bg-blue-600 text-white py-2 rounded-md font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
