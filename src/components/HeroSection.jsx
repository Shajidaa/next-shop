import { ArrowRight, Sparkles, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/10 rounded-full blur-2xl"></div>
      
      {/* Hero Section */}
      <section className="relative py-10 md:py-15 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-semibold text-sm mb-6 animate-in slide-in-from-left-5 duration-700">
                <Sparkles className="w-4 h-4" />
                Premium Collection 2024
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-in slide-in-from-left-5 duration-700 delay-100">
                Discover Premium{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Luxury
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl animate-in slide-in-from-left-5 duration-700 delay-200">
                Curated collection of finest products designed for those who
                appreciate excellence and quality. Experience luxury redefined.
              </p>
              
              {/* Stats */}
              <div className="flex items-center gap-8 mb-8 animate-in slide-in-from-left-5 duration-700 delay-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Customers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold text-foreground">4.9</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-left-5 duration-700 delay-400">
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl transition-all duration-200"
                >
                  Learn More
                  <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Image/Visual */}
            <div className="relative animate-in slide-in-from-right-5 duration-700 delay-500">
              {/* Main Image Container */}
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20 rounded-3xl blur-2xl scale-105"></div>
                
                {/* Image */}
                <div className="relative bg-gradient-to-br from-muted/50 to-muted/20 rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
                  <div className="aspect-[4/3] flex items-center justify-center relative">
                    <img
                      src="/luxury-product-showcase.jpg"
                      alt="Premium product collection"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/10"></div>
                  </div>
                </div>
                
                
                
                <div className="absolute -bottom-4 -left-4 bg-card border border-border/50 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Premium Quality</div>
                      <div className="text-xs text-muted-foreground">Verified Products</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    
      </section>
    </div>
  );
};

export default HeroSection;
