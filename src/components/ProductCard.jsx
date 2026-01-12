import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
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
              <span className="text-white font-semibold">Out of Stock</span>
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
  );
};

export default ProductCard;
