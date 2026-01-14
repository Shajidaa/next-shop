// Products listing page

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  Filter, 
  Loader2,
  Package,
  X
} from "lucide-react";
import CategoryFilter from "@/components/category";
import ProductCard from "@/components/ProductCard";
export const metadata = {
  title: 'Explor Products | Next Shop',

}
export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  // Initialize category from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      setShowFilters(true); // Show filters when coming from category link
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.data);
        setFilteredProducts(data.data);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Top Row - Search and Main Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              {/* Search Bar */}
              <div className="relative flex-1 w-full sm:max-w-md">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 bg-input border border-border rounded-lg sm:rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring focus:border-accent placeholder:text-muted-foreground text-sm sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Controls Row */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 bg-input border border-border rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-ring focus:border-accent text-sm sm:text-base min-w-0"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base font-medium min-w-0 ${
                    showFilters 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-input hover:bg-muted border border-border"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden xs:inline">Filters</span>
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedCategory) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">Active filters:</span>
                {searchTerm && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                    <span>Search: "{searchTerm}"</span>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="hover:bg-accent/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedCategory && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    <span>Category</span>
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-muted-foreground hover:text-foreground font-medium underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Category Filter Panel */}
          {showFilters && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-muted/30 rounded-lg sm:rounded-xl border border-border/50">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Filter by Category</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs sm:text-sm text-accent hover:text-accent/80 font-medium"
                >
                  Clear All
                </button>
              </div>
              <div className="overflow-x-auto">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-16 sm:py-20">
              <div className="text-center">
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-accent mx-auto mb-3 sm:mb-4" />
                <p className="text-muted-foreground text-sm sm:text-base">Loading amazing products...</p>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {searchTerm ? `Search Results` : selectedCategory ? `Category Results` : `All Products`}
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-medium w-fit">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                </div>
                
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    Clear filters
                  </button>
                )}
              </div>

              {/* Products Grid */}
              <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                {searchTerm || selectedCategory 
                  ? "Try adjusting your search or filter criteria to find what you're looking for."
                  : "No products are available at the moment."
                }
              </p>
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg sm:rounded-xl hover:bg-primary/90 transition-colors text-sm sm:text-base font-medium"
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
