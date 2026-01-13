// Home page with hero section and featured products

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      {/* Featured Products Section */}
      <FeaturedProducts></FeaturedProducts>
      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Our Full Catalog</h2>
          <p className="text-lg mb-8">Browse hundreds of premium products</p>
          <Link
            href="/products"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
