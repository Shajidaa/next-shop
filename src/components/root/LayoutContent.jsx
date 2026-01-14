"use client";
import useThemeStore from '@/context/ThemeContext';
import  { useEffect } from 'react'

export default function LayoutContent({ children }) {
  const { theme, applyTheme, _hasHydrated } = useThemeStore();

  useEffect(() => {
    if (_hasHydrated) {
      applyTheme(theme);
    }
  }, [_hasHydrated, theme, applyTheme]);

  return children;
}

