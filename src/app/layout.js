"use client";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <AuthProvider>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </AuthProvider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next Shop</title>
        <meta name="description" content="Premium e-commerce platform" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
