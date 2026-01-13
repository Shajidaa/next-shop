"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      const initialTheme = savedTheme || systemTheme;
      
      setTheme(initialTheme);
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error);
      setTheme("light");
    } finally {
      setMounted(true);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (mounted) {
      try {
        const root = document.documentElement;
        
        if (theme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
        
        localStorage.setItem("theme", theme);
      } catch (error) {
        console.warn("Failed to apply theme:", error);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const setLightTheme = () => setTheme("light");
  const setDarkTheme = () => setTheme("dark");

  const value = {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
    mounted
  };

  // Prevent hydration mismatch by rendering a placeholder during SSR
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ ...value, mounted: false }}>
        <div suppressHydrationWarning>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}