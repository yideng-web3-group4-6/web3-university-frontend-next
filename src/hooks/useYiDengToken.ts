import { useCallback } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from 'viem'; // 使用 viem 的 parseEther，避免 BigNumber 问题
import YiDengTokenABI from '@/abis/YiDengToken.json'; // 导入合约 ABI

// 提取合约地址
const YI_DENG_TOKEN_ADDRESS = YiDengTokenABI.networks['1337'].address;
// const YI_DENG_TOKEN_ADDRESS = "0x2cd99DD1804F1D0B1a704e3D112A15f27b2851f0";

// 精简的 Hook，仅用于购买代币
export const useYiDengToken = () => {
  const walletAccount = useAccount();

  // 使用 ETH 购买代币
  const { writeContractAsync: buyWithETH, isPending: isBuying } = useWriteContract();

  const buyTokensWithETH = useCallback(
    async (ethAmount: string) => {
      if (!walletAccount.isConnected) throw new Error('Please connect your wallet');

      const ethValue = parseEther(ethAmount); // viem 的 parseEther 直接返回 bigint

      const tx = await buyWithETH({
        address: YI_DENG_TOKEN_ADDRESS as `0x${string}`,
        abi: YiDengTokenABI.abi, // 直接传入 abi
        functionName: 'buyWithETH',
        value: ethValue,
      });
      return tx; // 返回交易哈希
    },
    [walletAccount.isConnected, buyWithETH],
  );

  // 查询账户代币余额
  const {
    data: tokenBalance,
    isLoading: isBalanceLoading,
    error: balanceError,
  } = useReadContract({
    address: YI_DENG_TOKEN_ADDRESS as `0x${string}`,
    abi: YiDengTokenABI.abi,
    functionName: 'balanceOf',
    args: [walletAccount.address], // 传入当前账户地址
    query: {
      enabled: !!walletAccount.address, // 仅在地址存在时查询
    },
  });
  console.log('Balance Error:', balanceError);

  return {
    isConnected: walletAccount.isConnected,
    buyTokensWithETH,
    isBuying,
    tokenBalance, // 格式化为可读的字符串
    isBalanceLoading,
  };
};
