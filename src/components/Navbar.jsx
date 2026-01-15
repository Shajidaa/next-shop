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





  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border/50"
          : "bg-card shadow-sm border-b border-border/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  NextShop
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Navigation Links */}
            <Link
              href="/"
              className={`relative px-3 xl:px-4 py-2 rounded-lg font-medium text-sm xl:text-base transition-all duration-200 ${
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
              className={`relative px-3 xl:px-4 py-2 rounded-lg font-medium text-sm xl:text-base transition-all duration-200 ${
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
                className={`relative px-3 xl:px-4 py-2 rounded-lg font-medium text-sm xl:text-base transition-all duration-200 ${
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
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {!loading &&
              (user ? (
                <div className="flex items-center space-x-2 xl:space-x-4">
                  {/* User Avatar & Info */}
                  <div className="flex items-center space-x-2 xl:space-x-3 bg-muted/50 rounded-full px-3 xl:px-4 py-1.5 xl:py-2">
                    <div className="w-7 h-7 xl:w-8 xl:h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-semibold text-xs xl:text-sm shrink-0">
                      {(user.data?.name || user.username || "A").charAt(0).toUpperCase()}
                    </div>
                    <div className="text-right hidden xl:block">
                      <p className="font-semibold text-foreground text-sm leading-tight">
                        {user.data?.name || user.username }
                      </p>
                      <p className="text-muted-foreground text-xs leading-tight">
                        {user.data?.email || user.email}
                      </p>
                    </div>
                  </div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="group relative px-3 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-sm font-medium text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/10 hover:border-destructive/30 transition-all duration-200 overflow-hidden"
                  >
                    <span className="relative z-10">Logout</span>
                    <div className="absolute inset-0 bg-destructive/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 xl:space-x-3">
                  <Link
                    href="/login"
                    className="px-3 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-sm font-medium text-muted-foreground hover:text-accent rounded-lg hover:bg-muted/50 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="group relative px-4 xl:px-6 py-1.5 xl:py-2 text-xs xl:text-sm font-medium text-primary-foreground bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl overflow-hidden"
                  >
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-accent/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                  </Link>
                </div>
              ))}
          </div>

          {/* Mobile/Tablet menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <ThemeToggle />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-0.5 sm:translate-y-1" : "-translate-y-0.5 sm:-translate-y-1"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 sm:w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-0.5 sm:-translate-y-1" : "translate-y-0.5 sm:translate-y-1"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-card/95 backdrop-blur-md border-t border-border/50 p-3 sm:p-4 space-y-2">
          {/* Mobile Navigation Links */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
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
            className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
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
              className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
                pathname.startsWith("/dashboard")
                  ? "text-accent bg-accent/10 border-l-4 border-accent"
                  : "text-foreground hover:text-accent hover:bg-muted/50"
              }`}
            >
              Dashboard
            </Link>
          )}

          {/* Mobile User Section */}
          <div className="pt-3 sm:pt-4 border-t border-border/50 space-y-2 sm:space-y-3">
            {user ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-muted/50 rounded-lg">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm sm:text-base shrink-0">
                    {(user.data?.name || user.username || "A").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                      {user.data?.name || user.username || "Admin"}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm truncate">
                      {user.data?.email || user.email}
                    </p>
                  </div>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-destructive font-medium border border-destructive/20 rounded-lg hover:bg-destructive/10 active:bg-destructive/15 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground font-medium border border-border rounded-lg hover:bg-muted/50 active:bg-muted transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-primary-foreground font-medium bg-gradient-to-r from-primary to-primary/90 rounded-lg hover:from-primary/90 hover:to-primary active:scale-[0.98] transition-all duration-200 shadow-lg"
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
