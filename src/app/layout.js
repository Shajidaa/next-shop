
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import LayoutContent from "@/components/root/LayoutContent";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
     
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
