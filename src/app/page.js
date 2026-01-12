// Home page with hero section and featured products

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[600px] bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center py-20">
        <div className="text-center max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Premium Products for Modern Living
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8">
            Discover our carefully curated collection of high-quality items
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}

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
