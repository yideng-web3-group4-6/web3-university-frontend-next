import { useCallback } from 'react';
import { useAccount, useWriteContract, useReadContract, useChainId } from 'wagmi';
import { Address, parseEther } from 'viem'; // 使用 viem 的 parseEther，避免 BigNumber 问题
import YiDengTokenABI from '@/abis/YiDengToken.json'; // 导入合约 ABI
import { YD_TOKEN_ADDRESS } from '@/constands/common';


type UseYiDengTokenReturn = {
  buyTokensWithETH: (ethAmount: string) => Promise<Address>;
  isBuying: boolean;
  tokenBalance: number;
  isBalanceLoading: boolean;
  handlrTransferYDToken: (yd: string, recipient: Address) => void;
};

// 精简的 Hook，仅用于购买代币
export const useYiDengToken = (): UseYiDengTokenReturn => {
  const walletAccount = useAccount();
  const chainId = useChainId()
  const YI_DENG_TOKEN_ADDRESS = YD_TOKEN_ADDRESS[chainId]
  // 使用 ETH 购买代币
  const { writeContract, writeContractAsync: buyWithETH, isPending: isBuying } = useWriteContract();
  const buyTokensWithETH = useCallback(
    async (ethAmount: string) => {
      if (!walletAccount.isConnected) throw new Error('Please connect your wallet');
      const ethValue = parseEther(ethAmount);
      const tx = await buyWithETH({
        address: YI_DENG_TOKEN_ADDRESS,
        abi: YiDengTokenABI.abi, // 直接传入 abi
        functionName: 'buyWithETH',
        value: ethValue,
      });
      return tx; // 返回交易哈希
    },
    [walletAccount.isConnected, buyWithETH, YI_DENG_TOKEN_ADDRESS],
  );

  // 查询账户代币余额
  const { data: tokenBalance, isLoading: isBalanceLoading } = useReadContract({
    address: YI_DENG_TOKEN_ADDRESS, // 合约地址
    abi: YiDengTokenABI.abi, // 合约abi
    functionName: 'balanceOf', // 方法名
    args: [walletAccount.address], // 传入当前账户地址
    query: {
      enabled: !!walletAccount.address, // 仅在地址存在时查询
    },
  });

  const handlrTransferYDToken = async (yd: string, recipient: Address) => {
    try {
      const amountInWei = Number(yd);
      writeContract({
        address: YI_DENG_TOKEN_ADDRESS,
        abi: YiDengTokenABI.abi,
        functionName: 'transfer',
        args: [recipient, amountInWei],
      });
      console.log('转账交易已提交！');
    } catch (err) {
      console.error('转账失败:', err);
    }
  };

  return {
    buyTokensWithETH,
    isBuying,
    tokenBalance: tokenBalance as number, // 格式化为可读的字符串
    isBalanceLoading,
    handlrTransferYDToken,
  };
};
