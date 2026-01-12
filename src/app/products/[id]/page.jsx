"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  console.log("product details", params, product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/productDetails/${params.id}`);
        const data = await response.json();
        setProduct(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 text-lg mb-4">Product not found</p>
        <Link href="/products" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-900">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.productName}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8 flex items-center justify-center">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.productName}
                width={400}
                height={400}
                className="object-contain"
              />
            ) : (
              <div className="text-gray-400">No image available</div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg p-8">
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                {product.category?.categoryName}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.productName}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.round(product.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.commentsCount} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.finalPrice?.toFixed(2) || "0.00"}
                </span>
                {product.originalPrice > product.finalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice?.toFixed(2) || "0.00"}
                    </span>
                    {product.discount?.enabled && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded font-semibold">
                        Save ${product.discount?.amount || "0.00"}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Product Description */}
            {product.shortDescription && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                />
              </div>
            )}

            {/* Product Details */}
            <div className="mb-6 space-y-3 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Brand:</span>
                <span className="font-semibold text-gray-900">
                  {product.brand?.brandName || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Unit:</span>
                <span className="font-semibold text-gray-900">
                  {product.unit?.unitValue} {product.unit?.unitName || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Cost:</span>
                <span className="font-semibold text-gray-900">
                  ${product.shippingCost || "0.00"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span
                  className={`font-semibold ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock
                    ? `${product.stockQuantity} in stock`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Add to Cart Section */}
            {product.inStock ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-gray-700 font-semibold">
                    Quantity:
                  </label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                This product is currently out of stock
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t space-y-4 text-sm text-gray-600">
              <p>✓ Free shipping on orders over $100</p>
              <p>✓ 30-day money-back guarantee</p>
              <p>✓ 2-year warranty on all products</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
