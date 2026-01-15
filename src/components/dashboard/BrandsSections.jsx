"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  MoreHorizontal,
  Building2,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Package
} from "lucide-react";

import CDNImage from "@/components/CDNImage";

export default function BrandsSections({brands=[], loading=false}) {

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrands, setFilteredBrands] = useState(brands);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
console.log(brands);

  // Initialize filtered brands when brands prop changes
  useEffect(() => {
    setFilteredBrands(brands);
  }, [brands]);

  useEffect(() => {
    const filtered = brands.filter((brand) => {
      const matchesSearch =
        brand.brandName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.shortName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
    setFilteredBrands(filtered);
  }, [searchTerm, brands]);

  const handleSelectBrand = (brandId) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBrands.length === filteredBrands.length) {
      setSelectedBrands([]);
    } else {
      setSelectedBrands(filteredBrands.map(brand => brand.brandId || brand.id));
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBrands([]);
  };


  return (
    <div className="space-y-3 xs:space-y-4 sm:space-y-6 p-3 xs:p-4 sm:p-6 lg:p-0">
      {/* Header */}
      <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-foreground">Brands Management</h1>
          <p className="text-xs xs:text-sm sm:text-base text-muted-foreground mt-1">Manage your product brands and their information</p>
        </div>
        <div className="flex items-center gap-2 xs:gap-3">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-2 xs:py-2.5 sm:py-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-xs xs:text-sm sm:text-base">
            <Plus className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            <span>Add Brand</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-card border border-border/50 rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 xs:gap-3 sm:gap-4">
            <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-lg xs:text-xl sm:text-2xl font-bold text-foreground">{brands.length}</p>
              <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">Total Brands</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 xs:gap-3 sm:gap-4">
            <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-green-50 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div>
              <p className="text-lg xs:text-xl sm:text-2xl font-bold text-foreground">{brands.filter(b => b.status !== false).length}</p>
              <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 xs:gap-3 sm:gap-4">
            <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-orange-50 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-lg xs:text-xl sm:text-2xl font-bold text-foreground">{brands.filter(b => b.status === false).length}</p>
              <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">Inactive</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 xs:gap-3 sm:gap-4">
            <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-purple-50 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
              <Eye className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-lg xs:text-xl sm:text-2xl font-bold text-foreground">{filteredBrands.length}</p>
              <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">Filtered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border/50 rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6">
        <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-2.5 xs:left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 xs:pl-10 sm:pl-12 pr-9 xs:pr-10 sm:pr-12 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base bg-input border border-border rounded-lg sm:rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring focus:border-accent placeholder:text-muted-foreground"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 xs:right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all text-xs xs:text-sm sm:text-base ${
                showFilters 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-input hover:bg-muted border border-border"
              }`}
            >
              <Filter className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              <span>Filters</span>
            </button>

            {selectedBrands.length > 0 && (
              <div className="flex items-center gap-1.5 xs:gap-2 bg-muted px-2 xs:px-3 py-1.5 xs:py-2 rounded-lg">
                <span className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  {selectedBrands.length} selected
                </span>
                <button className="p-1 xs:p-1.5 sm:p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                  <Trash2 className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-3 xs:mt-4 p-2.5 xs:p-3 sm:p-4 bg-muted/50 rounded-lg sm:rounded-xl border border-border/50">
            <div className="flex items-center justify-between mb-2 xs:mb-3 sm:mb-4">
              <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-foreground">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-[10px] xs:text-xs sm:text-sm text-accent hover:text-accent/80 font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
              <select className="px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base bg-input border border-border rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-ring">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select className="px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base bg-input border border-border rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-ring">
                <option value="">Sort By</option>
                <option value="name">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="created">Newest First</option>
                <option value="created-desc">Oldest First</option>
              </select>
              <select className="px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base bg-input border border-border rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-ring sm:col-span-2 lg:col-span-1">
                <option value="">Products Count</option>
                <option value="high">High to Low</option>
                <option value="low">Low to High</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Brands Table */}
      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border/50 bg-muted/30">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground">All Brands</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredBrands.length} of {brands.length} brands
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
              <p className="text-muted-foreground">Loading brands...</p>
            </div>
          </div>
        ) : filteredBrands.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20">
                  <th className="text-left p-4 w-12">
                    <input
                      type="checkbox"
                      checked={selectedBrands.length === filteredBrands.length && filteredBrands.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Brand</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Short Name</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Products</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Status</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Created</th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredBrands.map((brand) => (
                  <tr key={brand.brandId || brand.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.brandId || brand.id)}
                        onChange={() => handleSelectBrand(brand.brandId || brand.id)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center overflow-hidden relative">
                          {brand.logo ? (
                            <CDNImage
                              src={brand.logo}
                              alt={brand.brandName}
                              fallbackType="brand"
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <Building2 className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{brand.brandName}</p>
                       
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {brand.shortName || "—"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-foreground">
                        {brand.productsCount || 0}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                        brand.status !== false
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          brand.status !== false ? "bg-green-500" : "bg-red-500"
                        }`} />
                        {brand.status !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {brand.createdAt}
                      </span>
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No brands found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? "Try adjusting your search criteria to find what you're looking for."
                : "Get started by adding your first brand."
              }
            </p>
            {searchTerm ? (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear search
              </button>
            ) : (
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-semibold">
                <Plus className="w-4 h-4" />
                Add Your First Brand
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredBrands.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing {filteredBrands.length} of {brands.length} brands
          </p>
          <div className="flex items-center gap-2">
            <button className="px-2.5 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg text-xs sm:text-sm hover:bg-muted transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm hover:bg-primary/90 transition-colors">
              1
            </button>
            <button className="px-2.5 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg text-xs sm:text-sm hover:bg-muted transition-colors disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}