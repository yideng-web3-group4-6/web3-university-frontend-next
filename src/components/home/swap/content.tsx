import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { SwapVert } from '@mui/icons-material';
import { ethers } from 'ethers';
import { useAccount, useConnect, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import TokenInput from './input';
import { WagmiConnectButton } from '@/components/WagmiConnect/WalletConnectButton';
import { useContracts } from '@/context/ContractContext';
import { useLoading } from '@/context/LoadingContext';

const EXCHANGE_RATE = 1000; // 1000 YD = 1 ETH

const TokenSwap: React.FC = () => {
  const [amount, setAmount] = useState('0');
  const [isSwapped, setIsSwapped] = useState(false);
  const [yd_balance, setYdBalance] = useState('0');
  const { showLoading, hideLoading } = useLoading();

  const { address, isConnected } = useAccount();
  const { ydContract } = useContracts();

  const { data: ethBalance } = useBalance({
    address,
    enabled: isConnected,
  });

  const eth_Balance = ethBalance ? ethers.utils.formatEther(ethBalance.value) : '0';

  // 获取 YD 代币余额
  const getYdBalance = useCallback(async () => {
    if (ydContract && address) {
      try {
        const balance = await ydContract.balanceOf(address);
        setYdBalance(balance.toString());
      } catch (error) {
        console.error('获取 YD 余额失败:', error);
        setYdBalance('0');
      }
    }
  }, [ydContract, address]);

  // 监听合约和地址变化，更新 YD 余额
  useEffect(() => {
    getYdBalance();
  }, [getYdBalance]);

  // 计算兑换后的金额
  const exchangedAmount = useMemo(() => {
    if (!amount) return '0';
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return '0';

    if (isSwapped) {
      // 从 ETH 到 YD: 1 ETH = 1000 YD
      return (numAmount * EXCHANGE_RATE).toString();
    } else {
      // 从 YD 到 ETH: 1000 YD = 1 ETH
      return (numAmount / EXCHANGE_RATE).toString();
    }
  }, [amount, isSwapped]);

  // 检查余额是否足够
  const checkBalance = useCallback(() => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return false;

    if (!isSwapped) {
      // 检查 YD 余额是否足够
      return parseFloat(yd_balance) >= numAmount;
    } else {
      // 检查 ETH 余额是否足够
      return parseFloat(eth_Balance) >= numAmount;
    }
  }, [amount, isSwapped, yd_balance, eth_Balance]);

  const handleAmountChange = useCallback((value: string) => {
    setAmount(value);
  }, []);

  const handleMaxClick = () => {
    setAmount(isSwapped ? eth_Balance : yd_balance);
  };

  const handleSwap = () => {
    if (!isConnected) {
      return;
    }
    setIsSwapped(!isSwapped);
  };

  const contractSwap = async () => {
    if (!isConnected) {
      return;
    }

    if (!ydContract) return;

    // 检查余额是否足够
    if (!checkBalance()) {
      alert('Insufficient balance');
      return;
    }
    try {
      showLoading('Processing transaction...');
      if (!isSwapped) {
        // 卖出YD代币换取ETH
        const amountInWei = ethers.utils.parseEther(amount);
        const tx = await ydContract.sellTokens(amount);
        await tx.wait();
        // 交易成功后更新余额
        getYdBalance();
      } else {
        // 使用ETH购买YD代币
        const tx = await ydContract.buyWithETH({
          value: ethers.utils.parseEther(amount),
        });
        await tx.wait();
        // 交易成功后更新余额
        getYdBalance();
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-12 relative'>
        <TokenInput
          tokenSymbol={isSwapped ? 'ETH' : 'YD'}
          balance={isSwapped ? eth_Balance : yd_balance}
          value={amount}
          onChange={handleAmountChange}
          onMaxClick={handleMaxClick}
          showSplit={true}
        />

        <div className='bg-primary-500 z-50 rounded-full w-8 h-8 flex justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-primary-600 transition-colors'>
          <button
            onClick={handleSwap}
            className='rounded-full focus:bg-primary-600 align-middle cursor-pointer'
          >
            <SwapVert className='text-white' />
          </button>
        </div>

        <TokenInput
          tokenSymbol={isSwapped ? 'YD' : 'ETH'}
          balance={isSwapped ? yd_balance : eth_Balance}
          value={exchangedAmount}
          onChange={() => {}}
          disabled
          onMaxClick={() => {}}
          showSplit={false}
        />
      </div>
      {isConnected ? (
        <button
          onClick={contractSwap}
          className='w-full h-13 rounded-lg py-3 bg-primary-500 hover:bg-primary-600 transition-colors cursor-pointer'
        >
          <span className='font-bold text-white text-lg'>Swap</span>
        </button>
      ) : (
        <WagmiConnectButton showIcon={false} />
      )}
    </div>
  );
};

export default TokenSwap;
