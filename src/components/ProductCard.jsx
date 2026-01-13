import { Heart, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <Link key={product.id} href={`/products/${product.productId}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <div className="bg-muted aspect-square flex items-center justify-center relative overflow-hidden">
          {/* <img
            src={
              product.image ||
              `/luxury-product-.jpg?height=300&width=300&query=${product.name}`
            }
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          /> */}
          <button className="absolute top-3 right-3 bg-background rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <span className="text-xs text-accent font-semibold uppercase mb-2">
            {product.category.categoryName || "Product"}
          </span>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.productName}
          </h3>
          <div className="flex items-center gap-1 mb-3">
            <span className="text-sm text-foreground/70">
              {(Number(product.rating) || 4).toFixed(1)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <span className="text-xl font-bold text-accent">
              ${Number(product.finalPrice || 0).toFixed(2)}
            </span>
            <button className="px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-sm transition-colors">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
