import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Discover Premium Luxury
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8 text-balance">
                Curated collection of finest products designed for those who
                appreciate excellence and quality.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded transition-colors"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl aspect-square flex items-center justify-center">
                <img
                  src="/luxury-product-showcase.jpg"
                  alt="Premium product collection"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
