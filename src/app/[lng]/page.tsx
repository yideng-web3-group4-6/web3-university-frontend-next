"use client";
import React from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { CoinType } from "@/mockData/courseData";
import ExchangeSection from "@/components/Index/ExchangeSection";
import { useParams } from "next/navigation";

const Index = () => {
  const params = useParams();
  const lng = (params?.lng as string) || "en";

  const exchangeRates: Record<CoinType, BigNumber> = {
    ETH: BigNumber.from("1000"), // 1 ETH = 1000 $YD
    BTC: BigNumber.from("20000"), // 1 BTC = 20000 $YD
    USDT: BigNumber.from("2"), // 1 USDT = 2 $YD
    BNB: BigNumber.from("500"), // 1 BNB = 500 $YD
  };

  return (
    <>
      <ExchangeSection exchangeRates={exchangeRates} lng={lng} />
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
};
export default Index;
