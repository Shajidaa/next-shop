import { Heart, Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  // ডিসকাউন্ট আছে কিনা চেক করা
  const hasDiscount = product.discount?.enabled && product.originalPrice > product.finalPrice;

  return (
    <Link href={`/products/${product.productId}`}>
      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col group">
        
        {/* Image Section */}
        <div className="bg-muted aspect-square flex items-center justify-center relative overflow-hidden">
          <img
            src={product.thumbnail || "/placeholder.jpg"}
            alt={product.productName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          <button className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100 z-10">
            <Heart className="w-5 h-5" />
          </button>

          {/* Featured or New Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <div className="bg-yellow-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase shadow-sm">
                Featured
              </div>
            )}
            {!product.inStock && (
              <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded-lg text-[10px] font-bold uppercase">
                Out of Stock
              </div>
            )}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col">
          <span className="text-xs text-accent font-semibold uppercase tracking-wide mb-1">
            {product.category?.categoryName || "Product"}
          </span>
          
          <div className="flex-1">
            <h3 className="font-bold text-foreground text-base mb-2 line-clamp-1 leading-snug">
              {product.productName}
            </h3>
          </div>

       
     
          {/* Price Section */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex flex-row gap-2 ">
              <span className="text-xl font-bold text-primary">
                ${Number(product.finalPrice || 0).toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
              
            </div>
         
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;