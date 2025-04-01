import React, { useState } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { CoinType } from "@/mockData/courseData";

interface ExchangeSectionProps {
  // 汇率表，键是 CoinType，值是 BigNumber 表示的汇率
  exchangeRates: Record<CoinType, BigNumber>;
}

const ExchangeSection: React.FC<ExchangeSectionProps> = ({ exchangeRates }) => {
  const [ethAmount, setEthAmount] = useState<string>(""); // 输入的 ETH 总数
  const [selectedCoin, setSelectedCoin] = useState<CoinType>("ETH"); // 默认选择的兑换币种

  let yidengAmount = "0.00"; // 计算预计兑换的 $YD 数量，默认为 "0.00"

  try {
    // 如果输入有值，且输入的值是一个数字
    if (ethAmount && !isNaN(parseFloat(ethAmount))) {
      // 将输入的 ETH 数量转换为 BigNumber，乘以 100（保留两位小数精度）
      const amountBN = BigNumber.from(Math.floor(parseFloat(ethAmount) * 100));
      // 获取当前选择的币种的汇率
      const currentRate = exchangeRates[selectedCoin];
      // 计算兑换的 $YD 数量：输入数量 * 汇率
      const yidengAmountBN = amountBN.mul(currentRate);
      // 将结果除以 100（恢复小数精度），并格式化为两位小数
      yidengAmount = (yidengAmountBN.toNumber() / 100).toFixed(2);
    }
  } catch (error) {
    console.error("Error calculating yidengAmount:", error);
  }

  const handleExchange = () => {
    try {
      // 验证输入：如果输入为空或小于等于 0，提示用户
      if (!ethAmount || parseFloat(ethAmount) <= 0) {
        alert("请输入有效的数量");
        return;
      }
      // 弹出成功提示，显示兑换结果
      alert(`成功兑换！您用 ${ethAmount} ${selectedCoin} 兑换了 ${yidengAmount} $YD`);
      setEthAmount("");
    } catch (error) {
      alert("兑换失败，请检查输入！");
      console.error("Error during exchange:", error);
    }
  };

  return (
    <div className="hero-gradient pt-24">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue to-cyber-purple">
            加密货币兑换 $YD
          </h1>
          <div className="mt-6 max-w-2xl mx-auto">
            <p className="text-xl mb-6">
              输入数量，实时兑换 $YD，当前汇率：1 {selectedCoin} = {exchangeRates[selectedCoin].toString()} $YD
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-md flex gap-2">
                <input
                  type="number"
                  value={ethAmount}
                  onChange={(e) => setEthAmount(e.target.value)}
                  placeholder={`输入 ${selectedCoin} 数量`}
                  className="flex-1 bg-dark-card text-white px-4 py-3 rounded-lg border border-cyber-blue/30 focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all duration-300"
                />
                <select
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value as CoinType)}
                  className="bg-dark-card text-white px-4 py-3 rounded-lg border border-cyber-blue/30 focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all duration-300"
                >
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                  <option value="USDT">USDT</option>
                  <option value="BNB">BNB</option>
                </select>
              </div>
              <p className="text-lg">
                预计获得：<span className="text-cyber-purple font-bold">{yidengAmount}</span> $YD
              </p>
              <button
                onClick={handleExchange}
                className="bg-transparent border-2 border-cyber-blue text-cyber-blue px-6 py-3 rounded-lg font-medium hover:bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 hover:text-white hover:border-cyber-purple hover:shadow-neon transition-all duration-300"
              >
                立即兑换
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSection;
