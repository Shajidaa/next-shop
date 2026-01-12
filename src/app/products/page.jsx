// Products listing page

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // const [products, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.data);
        // setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   const filtered = products.filter(
  //     (product) =>
  //       product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.category?.categoryName
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredProducts(filtered);
  // }, [searchTerm, products]);
  console.log(products);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-8 px-6 border-b">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Our Products
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">
                Showing {products.length} product
                {products.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.productId}
                  ></ProductCard>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No products found matching your search
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
