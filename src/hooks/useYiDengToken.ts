import { useCallback } from "react";
import { useAccount, useWriteContract, useChains } from "wagmi";
import { parseEther } from "viem"; // 使用 viem 的 parseEther，避免 BigNumber 问题
import YiDengTokenABI from "@/abis/YiDengToken.json"; // 导入合约 ABI

// 提取合约地址
const YI_DENG_TOKEN_ADDRESS = YiDengTokenABI.networks["1337"].address;

// 精简的 Hook，仅用于购买代币
export const useYiDengToken = () => {
  const walletAccount = useAccount();
  const chains = useChains();

  // 使用 ETH 购买代币
  const { writeContractAsync: buyWithETH, isPending: isBuying } = useWriteContract();

  const buyTokensWithETH = useCallback(
    async (ethAmount: string) => {
      if (!walletAccount.isConnected) throw new Error("Please connect your wallet");

      const ethValue = parseEther(ethAmount); // viem 的 parseEther 直接返回 bigint

      const tx = await buyWithETH({
        address: YI_DENG_TOKEN_ADDRESS as `0x${string}`,
        abi: YiDengTokenABI.abi, // 直接传入 abi
        functionName: "buyWithETH",
        value: ethValue,
      });
      return tx; // 返回交易哈希
    },
    [walletAccount.isConnected, buyWithETH]
  );

  return {
    isConnected: walletAccount.isConnected,
    buyTokensWithETH,
    isBuying,
  };
};
