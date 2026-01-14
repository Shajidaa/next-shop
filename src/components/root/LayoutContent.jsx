"use client";
import useThemeStore from '@/context/ThemeContext';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { Navbar } from '../Navbar';
import Footer from '../Footer';

export default function LayoutContent( {children}) {

   
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

    function ThemeProvider({ children }) {
  const { theme, applyTheme, _hasHydrated } = useThemeStore();

  useEffect(() => {
    if (_hasHydrated) {
      applyTheme(theme);
    }
  }, [_hasHydrated, theme, applyTheme]);

  return children;
}

  return (
    <ThemeProvider>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer/>}
    </ThemeProvider>

  )
}

