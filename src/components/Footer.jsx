"use client";

import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  
  // Hide newsletter section on auth pages
  const isAuthPage = pathname === "/login" || pathname === "/register";

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Size Guide", href: "/size-guide" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" }
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: "facebook" },
    { name: "Twitter", href: "#", icon: "twitter" },
    { name: "Instagram", href: "#", icon: "instagram" },
    { name: "LinkedIn", href: "#", icon: "linkedin" }
  ];

  const SocialIcon = ({ name }) => {
    switch(name) {
      case "facebook":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-muted/30 via-background to-muted/20 border-t border-border/50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-56 h-56 xs:w-72 xs:h-72 sm:w-80 sm:h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section - Hidden on auth pages */}
        {!isAuthPage && (
          <div className="py-6 xs:py-8 sm:py-10 md:py-12 border-b border-border/50">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-semibold text-[10px] xs:text-xs sm:text-sm mb-2 xs:mb-2 sm:mb-3 md:mb-4">
                <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                Stay Updated
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 xs:mb-2 sm:mb-3 md:mb-4 px-2 xs:px-3 sm:px-4">
                Get the Latest Updates
              </h3>
              <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground mb-3 xs:mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2 xs:px-3 sm:px-4 leading-relaxed">
                Subscribe to our newsletter and be the first to know about new products, exclusive offers, and premium collections.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 xs:gap-2 sm:gap-3 md:gap-4 max-w-md mx-auto px-2 xs:px-3 sm:px-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-2 xs:left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-8 xs:pl-9 sm:pl-10 md:pl-12 pr-2 xs:pr-3 sm:pr-4 py-1.5 xs:py-2 sm:py-2.5 md:py-3 text-[10px] xs:text-xs sm:text-sm md:text-base bg-card border border-border rounded-md xs:rounded-lg sm:rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring focus:border-accent placeholder:text-muted-foreground"
                  />
                </div>
                <button className="group px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 xs:py-2 sm:py-2.5 md:py-3 text-[10px] xs:text-xs sm:text-sm md:text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold rounded-md xs:rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="py-6 xs:py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Brand Section */}
            <div className="xs:col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2">
              <Link href="/" className="inline-block mb-3 xs:mb-3 sm:mb-4 md:mb-6">
                <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  NextShop
                </span>
              </Link>
              <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground mb-3 xs:mb-3 sm:mb-4 md:mb-6 leading-relaxed max-w-md">
                Your trusted destination for premium products and exceptional service. 
                We curate the finest collection for those who appreciate quality and excellence.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-1.5 xs:space-y-2 sm:space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 xs:gap-2 sm:gap-2.5 md:gap-3 text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground">
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-accent/10 rounded-md xs:rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-accent" />
                  </div>
                  <span className="truncate">hello@nextshop.com</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-2 sm:gap-2.5 md:gap-3 text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground">
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-accent/10 rounded-md xs:rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-accent" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-2 sm:gap-2.5 md:gap-3 text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground">
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-accent/10 rounded-md xs:rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-accent" />
                  </div>
                  <span className="break-words">123 Premium Street, Luxury City</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-2 xs:mb-3 sm:mb-4 md:mb-6 text-xs xs:text-sm sm:text-sm md:text-base">Quick Links</h4>
              <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2 md:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground hover:text-accent transition-colors duration-200 flex items-center gap-1 xs:gap-1.5 sm:gap-2 group"
                    >
                      <ArrowRight className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-2 xs:mb-3 sm:mb-4 md:mb-6 text-xs xs:text-sm sm:text-sm md:text-base">Customer Support</h4>
              <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2 md:space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground hover:text-accent transition-colors duration-200 flex items-center gap-1 xs:gap-1.5 sm:gap-2 group"
                    >
                      <ArrowRight className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-2 xs:mb-3 sm:mb-4 md:mb-6 text-xs xs:text-sm sm:text-sm md:text-base">Legal</h4>
              <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2 md:space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground hover:text-accent transition-colors duration-200 flex items-center gap-1 xs:gap-1.5 sm:gap-2 group"
                    >
                      <ArrowRight className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-3 xs:py-4 sm:py-6 md:py-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 xs:gap-3 sm:gap-4 md:gap-6">
            {/* Copyright */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 xs:gap-1 sm:gap-1.5 md:gap-2 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-muted-foreground text-center sm:text-left">
              <span>&copy; {currentYear} NextShop. Made with</span>
              <Heart className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-red-500 fill-current shrink-0" />
              <span>for premium shopping.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 xs:gap-2 sm:gap-3 md:gap-4">
              <span className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-muted-foreground mr-0 xs:mr-0.5 sm:mr-1 md:mr-2 hidden xs:inline">Follow us:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 xs:w-9 xs:h-9 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-muted/50 hover:bg-accent/10 border border-border/50 hover:border-accent/30 rounded-md xs:rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-200 group"
                  aria-label={social.name}
                >
                  <SocialIcon name={social.icon} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
