// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Web3Provider } from "@/components/WagmiConnect/Web3Provider";
import { languages } from "@/i18n/config";
import { Suspense } from 'react';

// Optimize font loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
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
    <html lang={lng}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Web3Provider>
          <Suspense fallback={<div className="h-16 nav-blur fixed w-full z-50"></div>}>
            <Header />
          </Suspense>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <div>{children}</div>
          </Suspense>
        </Web3Provider>
      </body>
    </html>
  );
}