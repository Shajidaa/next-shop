"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import  useAuthStore  from "@/context/authStore";
import ThemeToggle from "@/components/ThemeToggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, loading } = useAuthStore();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActivePath = (path) => pathname === path;


console.log(user);


  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border/50"
          : "bg-card shadow-sm border-b border-border/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  NextShop
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Navigation Links */}
            <Link
              href="/"
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActivePath("/")
                  ? "text-accent bg-accent/10"
                  : "text-foreground hover:text-accent hover:bg-muted/50"
              }`}
            >
              Home
              {isActivePath("/") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></div>
              )}
            </Link>
            
            <Link
              href="/products"
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActivePath("/products")
                  ? "text-accent bg-accent/10"
                  : "text-foreground hover:text-accent hover:bg-muted/50"
              }`}
            >
              Products
              {isActivePath("/products") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></div>
              )}
            </Link>

            {/* Dashboard Link for Authenticated Users */}
            {user?.permissions && (
              <Link
                href="/dashboard"
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  pathname.startsWith("/dashboard")
                    ? "text-accent bg-accent/10"
                    : "text-foreground hover:text-accent hover:bg-muted/50"
                }`}
              >
                Dashboard
                {pathname.startsWith("/dashboard") && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></div>
                )}
              </Link>
            )}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {!loading &&
              (user ? (
                <div className="flex items-center space-x-4">
                  {/* User Avatar & Info */}
                  <div className="flex items-center space-x-3 bg-muted/50 rounded-full px-4 py-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {(user.data?.name || user.username || "A").charAt(0).toUpperCase()}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground text-sm">
                        {user.data?.name || user.username }
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {user.data?.email || user.email}
                      </p>
                    </div>
                  </div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="group relative px-4 py-2 text-sm font-medium text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/10 hover:border-destructive/30 transition-all duration-200 overflow-hidden"
                  >
                    <span className="relative z-10">Logout</span>
                    <div className="absolute inset-0 bg-destructive/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-accent rounded-lg hover:bg-muted/50 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="group relative px-6 py-2 text-sm font-medium text-primary-foreground bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl overflow-hidden"
                  >
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-accent/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                  </Link>
                </div>
              ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <ThemeToggle />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-card/95 backdrop-blur-md border-t border-border/50 p-4 space-y-2">
          {/* Mobile Navigation Links */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              isActivePath("/")
                ? "text-accent bg-accent/10 border-l-4 border-accent"
                : "text-foreground hover:text-accent hover:bg-muted/50"
            }`}
          >
            Home
          </Link>
          
          <Link
            href="/products"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              isActivePath("/products")
                ? "text-accent bg-accent/10 border-l-4 border-accent"
                : "text-foreground hover:text-accent hover:bg-muted/50"
            }`}
          >
            Products
          </Link>

          {/* Dashboard for Mobile */}
          {user?.permissions && (
            <Link
              href="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                pathname.startsWith("/dashboard")
                  ? "text-accent bg-accent/10 border-l-4 border-accent"
                  : "text-foreground hover:text-accent hover:bg-muted/50"
              }`}
            >
              Dashboard
            </Link>
          )}

          {/* Mobile User Section */}
          <div className="pt-4 border-t border-border/50 space-y-3">
            {user ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-3 px-4 py-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {(user.data?.name || user.username || "A").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {user.data?.name || user.username || "Admin"}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {user.data?.email || user.email}
                    </p>
                  </div>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-destructive font-medium border border-destructive/20 rounded-lg hover:bg-destructive/10 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-4 py-3 text-foreground font-medium border border-border rounded-lg hover:bg-muted/50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-4 py-3 text-primary-foreground font-medium bg-gradient-to-r from-primary to-primary/90 rounded-lg hover:from-primary/90 hover:to-primary transition-all duration-200 shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
