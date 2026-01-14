"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RefreshCw,
  Loader2,
  Package,
  Tag,
  Info
} from "lucide-react";

import CDNImage from "@/components/CDNImage";

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();
        
        if (response.ok && data) {
          // Handle the data structure - check if it's wrapped in a data property
          const productData = data.data || data;
          setProduct(productData);
        } else {
          console.error("Failed to fetch product:", data);
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  console.log("products details", product);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Adding ${quantity} of product ${product.productId} to cart`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 999)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice && product.finalPrice && product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.finalPrice) / product.originalPrice) * 100)
    : product.discount?.enabled && product.discount?.type === 'percent' 
    ? Math.round(Number(product.discount.amount))
    : 0;

  const isInStock = product.inStock && product.availability !== "out of stock" && product.stockQuantity > 0;

  return (
    <div className="min-h-screen ">
      {/* Breadcrumb */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              Products
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium truncate">{product.productName}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-card border border-border/50 rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden group">
                {product.thumbnail ? (
                  <CDNImage
                    src={product.thumbnail}
                    alt={product.productName}
                    fallbackType="product"
                    width={500}
                    height={500}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-center">
                    <Package className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No image available</p>
                  </div>
                )}
                
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                    -{discountPercentage}%
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-accent uppercase tracking-wide">
                    {product.category?.categoryName || "Product"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.productName}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(Number(product.rating) || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {(Number(product.rating) || 0).toFixed(1)} ({product.commentsCount || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  {Number(product.finalPrice) > 0 ? (
                    <>
                      <span className="text-3xl md:text-4xl font-bold text-foreground">
                        ${Number(product.finalPrice).toFixed(2)}
                      </span>
                      {product.originalPrice && Number(product.originalPrice) > Number(product.finalPrice) && (
                        <div className="flex flex-col">
                          <span className="text-lg text-muted-foreground line-through">
                            ${Number(product.originalPrice).toFixed(2)}
                          </span>
                          <span className="text-sm text-green-600 font-semibold">
                            Save ${Number(product.originalPrice - product.finalPrice).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center w-full">
                      <span className="text-2xl font-bold text-muted-foreground">
                        Price not available
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Contact us for pricing information
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={`font-semibold ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                    {isInStock 
                      ? `${product.stockQuantity || 0} in stock` 
                      : product.availability || 'Out of stock'
                    }
                  </span>
                </div>
              </div>

              {/* Description */}
              {product.shortDescription && (
                <div className="bg-card border border-border/50 rounded-2xl p-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Description
                  </h3>
                  <div 
                    className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                  />
                </div>
              )}

              {/* Product Details */}
              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-4">Product Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Brand:</span>
                    <span className="font-semibold text-foreground">
                      {product.brand?.brandName || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit:</span>
                    <span className="font-semibold text-foreground">
                      {product.unit?.unitValue} {product.unit?.unitName || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-semibold text-foreground">
                      ${Number(product.shippingCost || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SKU:</span>
                    <span className="font-semibold text-foreground">
                      {product.productId || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Likes:</span>
                    <span className="font-semibold text-foreground">
                      {product.likesCount || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Featured:</span>
                    <span className={`font-semibold ${product.featured ? 'text-accent' : 'text-muted-foreground'}`}>
                      {product.featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Section */}
              {isInStock && Number(product.finalPrice) > 0 ? (
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <label className="font-semibold text-foreground">Quantity:</label>
                    <div className="flex items-center bg-input border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-3 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 py-3 font-semibold text-foreground min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= (product.stockQuantity || 999)}
                        className="p-3 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        isWishlisted 
                          ? 'bg-red-50 border-red-200 text-red-600' 
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-4 border-2 border-border hover:bg-muted rounded-xl transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    <div>
                      <span className="font-semibold block">
                        {!isInStock ? (product.availability || 'Out of stock') : 'Price not available'}
                      </span>
                      {!isInStock && (
                        <span className="text-sm">
                          This product is currently unavailable
                        </span>
                      )}
                      {Number(product.finalPrice) === 0 && (
                        <span className="text-sm">
                          Contact us for pricing information
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Wishlist and Share still available */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                        isWishlisted 
                          ? 'bg-red-50 border-red-200 text-red-600' 
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                      {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                    <button className="p-4 border-2 border-border hover:bg-muted rounded-xl transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-card border border-border/50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card border border-border/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">2-Year Warranty</p>
                    <p className="text-xs text-muted-foreground">Full protection</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card border border-border/50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">30-Day Returns</p>
                    <p className="text-xs text-muted-foreground">Money back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
