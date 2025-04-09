// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Web3Provider } from "@/components/WagmiConnect/Web3Provider";
import { languages } from "@/i18n/config";
import { Suspense } from 'react';

// Optimize font loading with fallback strategy
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: 'swap',
  preload: true,
  fallback: ['monospace', 'Courier New', 'Courier'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "一灯大学",
  description: "颠覆你得认知，奥里给",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  const { lng } = params || { lng: 'zh' };
  
  return (
    <html lang={lng} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Web3Provider>
          <Header />
          <main suppressHydrationWarning>{children}</main>
        </Web3Provider>
      </body>
    </html>
  );
}