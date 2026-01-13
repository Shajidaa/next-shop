"use client";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import useThemeStore from "@/context/ThemeContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function ThemeProvider({ children }) {
  const { theme, applyTheme, _hasHydrated } = useThemeStore();

  useEffect(() => {
    if (_hasHydrated) {
      applyTheme(theme);
    }
  }, [_hasHydrated, theme, applyTheme]);

  return children;
}

function LayoutContent({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <ThemeProvider>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </ThemeProvider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Next Shop</title>
        <meta name="description" content="Premium e-commerce platform" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme-storage');
                if (theme) {
                  const parsed = JSON.parse(theme);
                  if (parsed.state && parsed.state.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
