"use client";

import { useEffect, useState } from "react";
import { Loader2, Tag } from "lucide-react";

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading categories...</span>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground text-sm">No categories available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <button
        onClick={() => onCategoryChange("")}
        className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
          selectedCategory === ""
            ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg"
            : "bg-input hover:bg-muted border border-border text-foreground"
        }`}
      >
        <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="whitespace-nowrap">All Categories</span>
      </button>
      
      {categories.map((category) => (
        <button
          key={category.categoryId}
          onClick={() => onCategoryChange(category.categoryId.toString())}
          className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
            selectedCategory === category.categoryId.toString()
              ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg"
              : "bg-input hover:bg-muted border border-border text-foreground"
          }`}
        >
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
            selectedCategory === category.categoryId.toString()
              ? "bg-primary-foreground/60"
              : "bg-accent"
          }`} />
          <span className="whitespace-nowrap">{category.categoryName}</span>
        </button>
      ))}
    </div>
  );
}
