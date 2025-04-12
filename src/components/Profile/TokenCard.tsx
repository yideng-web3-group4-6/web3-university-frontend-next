'use client'
import React from "react";
import { formatEther } from "viem";


interface BalanceAndCityProps {
  token: string;
}

const TokenCard: React.FC<BalanceAndCityProps> = ({ token }) => {
  return (
    <div className="bg-dark-card p-6 rounded-xl shadow-neon grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-semibold text-cyber-blue">一灯币总量</h3>
        <p className="text-2xl text-white mt-2">{token} YD</p>
      </div>
    </div>
  );
};

export default TokenCard;
