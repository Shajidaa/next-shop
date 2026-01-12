// Products listing page

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
                  <Link
                    key={product.productId}
                    href={`/products/${product.productId}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="bg-gray-100 h-48 flex items-center justify-center relative overflow-hidden">
                        {product.thumbnail ? (
                          <img
                            src={product.thumbnail || "/placeholder.svg"}
                            alt={product.productName}
                            width={200}
                            height={200}
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="text-gray-400">No image</div>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {product.brand?.brandName || "No brand"}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <p className="text-lg font-bold text-gray-900">
                              ${product.finalPrice?.toFixed(2) || "0.00"}
                            </p>
                            {product.originalPrice > product.finalPrice && (
                              <p className="text-sm text-gray-500 line-through">
                                ${product.originalPrice?.toFixed(2) || "0.00"}
                              </p>
                            )}
                          </div>
                          {product.discount?.enabled && (
                            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                              Sale
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-gray-600">
                            {product.rating || "0.0"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
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
