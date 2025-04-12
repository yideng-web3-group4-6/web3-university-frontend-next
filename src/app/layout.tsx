import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Web3Provider } from "@/components/WagmiConnect/Web3Provider";
import { cookies } from "next/headers";
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_COOKIE_KEY, getDictionary, Language } from "@/i18n/config";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "前端Web3大学",
  description: "探索前端开发与Web3技术的完美结合",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get language from cookies
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LANGUAGE_COOKIE_KEY)?.value;
  const locale = (localeCookie && AVAILABLE_LANGUAGES.includes(localeCookie as Language)) 
    ? localeCookie as Language 
    : DEFAULT_LANGUAGE;
    
  // Load dictionary
  const dictionary = await getDictionary(locale as Language);
  
  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`}>
        <Web3Provider>
          <Header dictionary={dictionary} currentLanguage={locale} />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
