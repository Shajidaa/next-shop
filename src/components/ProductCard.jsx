import { Heart, Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product, viewMode = "grid" }) => {
  if (viewMode === "list") {
    return (
      <Link href={`/products/${product.productId}`}>
        <div className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex">
            <div className="w-48 h-48 bg-muted flex items-center justify-center relative overflow-hidden flex-shrink-0">
              {/* <img
                src={
                  product.image ||
                  `/luxury-product-.jpg?height=200&width=200&query=${product.name}`
                }
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              /> */}
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <span className="text-4xl opacity-50">📦</span>
              </div>
              <button className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-6 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="text-xs text-accent font-semibold uppercase tracking-wide">
                    {product.category?.categoryName || "Product"}
                  </span>
                  <h3 className="font-bold text-xl text-foreground mt-1 mb-2">
                    {product.productName}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-accent">
                    ${Number(product.finalPrice || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(Number(product.rating) || 4)
                          ? "text-yellow-400 fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({(Number(product.rating) || 4).toFixed(1)})
                </span>
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-xl transition-all duration-200 font-semibold">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button className="px-4 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-200 font-semibold">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.productId}`}>
      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col group">
        <div className="bg-muted aspect-square flex items-center justify-center relative overflow-hidden">
          {/* <img
            src={
              product.image ||
              `/luxury-product-.jpg?height=300&width=300&query=${product.name}`
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          /> */}
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <span className="text-6xl opacity-50">📦</span>
          </div>
          <button className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100">
            <Heart className="w-5 h-5" />
          </button>
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold">
            New
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <span className="text-xs text-accent font-semibold uppercase tracking-wide mb-2">
            {product.category?.categoryName || "Product"}
          </span>
          <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 flex-1">
            {product.productName}
          </h3>
          
          <div className="flex items-center gap-1 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(Number(product.rating) || 4)
                      ? "text-yellow-400 fill-current"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">
              ({(Number(product.rating) || 4).toFixed(1)})
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <span className="text-xl font-bold text-accent">
              ${Number(product.finalPrice || 0).toFixed(2)}
            </span>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-semibold transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
