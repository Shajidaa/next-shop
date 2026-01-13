// Products listing page

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  ArrowUpDown,
  Loader2,
  Package,
  X
} from "lucide-react";
import CategoryFilter from "@/components/category";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.data);
        setFilteredProducts(data.data);
        
        // Calculate price range
        if (data.data && data.data.length > 0) {
          const prices = data.data.map(p => Number(p.finalPrice || 0));
          setPriceRange({
            min: Math.min(...prices),
            max: Math.max(...prices)
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.categoryName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" ||
        product.category?.categoryId === Number.parseInt(selectedCategory);
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.finalPrice || 0) - Number(b.finalPrice || 0);
        case "price-high":
          return Number(b.finalPrice || 0) - Number(a.finalPrice || 0);
        case "rating":
          return Number(b.rating || 0) - Number(a.rating || 0);
        case "name":
        default:
          return a.productName.localeCompare(b.productName);
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, products, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("name");
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-r from-primary via-primary/95 to-accent text-primary-foreground py-16">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Browse our curated collection of premium products designed to enhance your lifestyle
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring focus:border-accent placeholder:text-muted-foreground"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-input border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring focus:border-accent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                  showFilters 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-input hover:bg-muted border border-border"
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex bg-input rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-colors ${
                    viewMode === "grid" 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-colors ${
                    viewMode === "list" 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          {showFilters && (
            <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filter by Category</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-accent hover:text-accent/80 font-medium"
                >
                  Clear All
                </button>
              </div>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">Loading amazing products...</p>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    {searchTerm ? `Search Results` : selectedCategory ? `Category Results` : `All Products`}
                  </h2>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                </div>
                
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear filters
                  </button>
                )}
              </div>

              {/* Products Grid */}
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchTerm || selectedCategory 
                  ? "Try adjusting your search or filter criteria to find what you're looking for."
                  : "No products are available at the moment."
                }
              </p>
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
