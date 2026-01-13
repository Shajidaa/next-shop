"use client";
import useThemeStore from "@/context/ThemeContext";
import { useEffect } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme, applyTheme, _hasHydrated } = useThemeStore();

  // Apply theme on mount (fallback)
  useEffect(() => {
    if (_hasHydrated) {
      applyTheme(theme);
    }
  }, [_hasHydrated, theme, applyTheme]);

  // Don't render until hydrated to prevent flash
  if (!_hasHydrated) {
    return <div className="p-2 w-10 h-10" />; 
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === "light" ? "☀️" : "🌙"}
    </button>
  );
}