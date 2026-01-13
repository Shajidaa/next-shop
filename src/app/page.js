// Home page with hero section and featured products

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Star, 
  Shield, 
  Truck, 
  RefreshCw, 
  Award,
  TrendingUp,
  Users,
  ShoppingBag
} from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const [stats, setStats] = useState({
    products: 500,
    customers: 10000,
    orders: 25000
  });

  const features = [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Every product is carefully curated and quality-tested",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50 with express delivery",
      color: "from-green-500 to-green-600"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy for your peace of mind",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Award,
      title: "Best Service",
      description: "Award-winning customer service available 24/7",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">500+</div>
              <div className="text-muted-foreground">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">25K+</div>
              <div className="text-muted-foreground">Orders Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Store?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience through quality products and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-card border border-border/50 rounded-2xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that our customers love most.
            </p>
          </div>
          
          <div className="mb-12">
            <FeaturedProducts />
          </div>
          
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-accent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Stay Updated with Latest Offers
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special promotions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border-0 outline-none focus:ring-2 focus:ring-white/50 placeholder:text-muted-foreground"
              />
              <button className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            
            <p className="text-sm text-primary-foreground/60 mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-3xl p-12 border border-border/50">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their premium shopping needs. Browse our complete catalog today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl transition-all duration-200 group"
              >
                Create Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
