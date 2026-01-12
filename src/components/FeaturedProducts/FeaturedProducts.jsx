"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

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
    return <div className="text-gray-600">Loading ...</div>;
  }
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featured.map((product) => (
        <ProductCard key={product.productId} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default FeaturedProducts;
