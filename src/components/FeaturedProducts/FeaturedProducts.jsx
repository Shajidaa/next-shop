"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Loader2 } from "lucide-react";

const FeaturedProducts = () => {
  const [featured, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/featured");
        const data = await response.json();
        setFeaturedProducts(data.data);
      } catch (error) {
        console.error("Error fetching featured:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading featured products...</p>
        </div>
      </div>
    );
  }

  if (!featured || featured.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📦</span>
        </div>
        <p className="text-muted-foreground">No featured products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featured.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
