"use client";

import Link from "next/link";
import { LayoutDashboard, ArrowLeft, Home } from "lucide-react";

export default function DashboardNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <LayoutDashboard className="w-10 h-10 text-destructive" />
        </div>
        
        <h1 className="text-5xl font-bold text-foreground mb-3">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Dashboard Page Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          The dashboard page you're looking for doesn't exist or you don't have access to it.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard Home
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-card border border-border text-foreground rounded-xl hover:bg-muted transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Main Site
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-3">Quick Links:</p>
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <Link href="/dashboard/addresses" className="text-primary hover:underline">
              Addresses
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/dashboard/brands" className="text-primary hover:underline">
              Brands
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
