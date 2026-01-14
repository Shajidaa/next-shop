"use client";

import Link from "next/link";
import { Home, Package, ArrowLeft } from "lucide-react";

export default function MarketingNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Package className="w-12 h-12 text-muted-foreground" />
        </div>
        
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-semibold"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border-2 border-border text-foreground rounded-xl hover:bg-muted transition-colors font-semibold"
          >
            <Package className="w-5 h-5" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
