import React from "react";

interface BalanceAndCityProps {
  ethBalance: string;
}

const BalanceAndCity: React.FC<BalanceAndCityProps> = ({ ethBalance }) => {
  return (
    <div className="bg-dark-card p-6 rounded-xl shadow-neon grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-semibold text-cyber-blue">ETH 余额</h3>
        <p className="text-2xl text-white mt-2">{ethBalance} ETH</p>
      </div>
    </div>
  );
};

export default BalanceAndCity;
