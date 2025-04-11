import React from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { CoinType } from "@/mockData/courseData";
import ExchangeSection from "@components/Index/ExchangeSection";
import { cookies } from "next/headers";
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE_KEY, Language, AVAILABLE_LANGUAGES, getDictionary } from "@/i18n/config";

export default async function Home() {
  // Get language from cookies for server-side rendering
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LANGUAGE_COOKIE_KEY)?.value;
  const locale = (localeCookie && AVAILABLE_LANGUAGES.includes(localeCookie as Language)) 
    ? localeCookie as Language 
    : DEFAULT_LANGUAGE;
    
  // Load dictionary
  await getDictionary(locale as Language);

  // Define exchange rates
  const exchangeRates: Record<CoinType, BigNumber> = {
    ETH: BigNumber.from("1000"),
    BTC: BigNumber.from("20000"),
    USDT: BigNumber.from("2"),
    BNB: BigNumber.from("500"),
  };

  return (
    <>
      <ExchangeSection exchangeRates={exchangeRates} />
      {/* <div className="hero-gradient pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue to-cyber-purple">
              前端 Web3 大学
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">探索前端开发与Web3技术的完美结合，开启您的区块链开发之旅</p>
          </div>
        </div>
      </div> */}

      {/* <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              routeKey={feature.routeKey}
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div> */}
    </>
  );
}
