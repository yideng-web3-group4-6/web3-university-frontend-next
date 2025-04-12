import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Web3Provider } from "@/components/WagmiConnect/Web3Provider";
import { languages } from "@/i18n/config";
import { Suspense } from "react"; // 引入Suspense

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  return (
    <html lang={lng}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider>
          {/* 使用Suspense包裹Header组件，提供加载时的备用UI */}
          <Suspense fallback={<div className="h-16"></div>}>
            <Header />
          </Suspense>
          <div className="pt-[65px]">{children}</div>
        </Web3Provider>
      </body>
    </html>
  );
}
