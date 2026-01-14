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
  X
} from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import CDNImage from "@/components/CDNImage";

export default function DashboardBrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
console.log(brands);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/client/v1/brands");
        const data = await response.json();
        
        if (response.ok && data) {
          const brandsData = data.data || data;
          setBrands(brandsData);
          setFilteredBrands(brandsData);
        } else {
          console.error("Failed to fetch brands:", data);
          setBrands([]);
          setFilteredBrands([]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([]);
        setFilteredBrands([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Brands Management</h1>
          <p className="text-muted-foreground">Manage your product brands and their information</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            Add Brand
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{brands.length}</p>
              <p className="text-sm text-muted-foreground">Total Brands</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{brands.filter(b => b.status !== false).length}</p>
              <p className="text-sm text-muted-foreground">Active Brands</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{brands.filter(b => b.status === false).length}</p>
              <p className="text-sm text-muted-foreground">Inactive Brands</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{filteredBrands.length}</p>
              <p className="text-sm text-muted-foreground">Filtered Results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border/50 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="relative flex-1 w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search brands..."
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

            {selectedBrands.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedBrands.length} selected
                </span>
                <button className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-accent hover:text-accent/80 font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="px-4 py-2 bg-input border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select className="px-4 py-2 bg-input border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring">
                <option value="">Sort By</option>
                <option value="name">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="created">Newest First</option>
                <option value="created-desc">Oldest First</option>
              </select>
              <select className="px-4 py-2 bg-input border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring">
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
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Actions</th>
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
                          {brand.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {brand.description}
                            </p>
                          )}
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
                        {brand.createdAt ? new Date(brand.createdAt).toLocaleDateString() : "—"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/brands/${brand.brandId || brand.id}`}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        <Link
                          href={`/dashboard/brands/${brand.brandId || brand.id}`}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        <button 
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${brand.brandName}?`)) {
                              console.log("Delete brand:", brand.brandId || brand.id);
                              // Here you would make an API call to delete the brand
                            }
                          }}
                          className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
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
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBrands.length} of {brands.length} brands
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
              1
            </button>
            <button className="px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}