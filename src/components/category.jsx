"use client";

import { useEffect, useState } from "react";

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
  console.log(categories);

  if (loading) {
    return <div className="text-gray-600">Loading categories...</div>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onCategoryChange("")}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          selectedCategory === ""
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category.categoryId}
          onClick={() => onCategoryChange(category.categoryId.toString())}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === category.categoryId.toString()
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
}
