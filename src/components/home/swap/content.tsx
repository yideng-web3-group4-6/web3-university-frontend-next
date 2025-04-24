import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { SwapVert } from '@mui/icons-material';
import { ethers } from 'ethers';
import { YiDengToken__factory } from '@/typechain-types';
import { useAccount, useBalance, useChainId } from 'wagmi';
import TokenInput from './input';
import { WagmiConnectButton } from '@/components/WagmiConnect/WalletConnectButton';
import { YD_TOKEN_ADDRESS } from '@/constands/common';


const EXCHANGE_RATE = 1000; // 1000 YD = 1 ETH

const TokenSwap: React.FC = () => {
  const chainId = useChainId()
  const YIDENG_TOKEN_ADDRESS = YD_TOKEN_ADDRESS[chainId]
  // 状态：用户输入的兑换资产总量（代币或 ETH）
  const [amount, setAmount] = useState('0');
  // 状态：兑换方向，false 表示 YD → ETH，true 表示 ETH → YD
  const [isSwapped, setIsSwapped] = useState(false);
  // 状态：Web3 提供者（如 MetaMask）
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  // 状态：签名者（用户的钱包，用于签署交易）
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  // 状态：YiDengToken 合约实例
  const [contract, setContract] = useState<any>(null);
  // 状态：用户的 YD 代币余额
  const [yd_balance, setYdBalance] = useState('0');
  // 使用 Wagmi 获取连接钱包的地址和连接状态
  const { address, isConnected } = useAccount();
  // 使用 Wagmi 获取连接钱包的 ETH 余额
  const { data: ethBalance } = useBalance({ address });
  // 将 ETH 余额格式化为可读的字符串（单位为 ETH，而不是 Wei）
  const eth_Balance = ethBalance ? ethers.utils.formatEther(ethBalance.value) : '0';
  // 获取 YD 代币余额
  const getYdBalance = useCallback(async () => {
    if (contract && address) {
      try {
        // 调用合约的 balanceOf 方法获取用户的 YD 余额
        const balance = await contract.balanceOf(address);
        setYdBalance(balance.toString());
      } catch (error) {
        console.error('获取 YD 余额失败:', error);
        setYdBalance('0');
      }
    }
  }, [contract, address]);

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

  // 初始化合约连接
  const initContract = useCallback(async () => {
    if (window.ethereum && isConnected) {
      // 创建 Web3 提供者（通过 MetaMask 或其他钱包）
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // 获取签名者（用户的钱包）
      const signer = provider.getSigner();
      // 使用 YiDengToken 合约地址和签名者创建合约实例
      const contract = YiDengToken__factory.connect(YIDENG_TOKEN_ADDRESS, signer);
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
    }
  }, [isConnected, YIDENG_TOKEN_ADDRESS]);

  React.useEffect(() => {
    initContract();
  }, [initContract]);

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

  const handleWrap = async () => {
    if (!isConnected) {
      return;
    }

    if (!contract || !signer) return;

    // 检查余额是否足够
    if (!checkBalance()) {
      alert('余额不足');
      return;
    }
    try {
      if (!isSwapped) {
        // 卖出YD代币换取ETH
        const amountInWei = ethers.utils.parseEther(amount);
        const tx = await contract.sellTokens(amount);
        await tx.wait();
        // 交易成功后更新余额
        getYdBalance();
      } else {
        // 使用ETH购买YD代币
        const tx = await contract.buyWithETH({
          value: ethers.utils.parseEther(amount),
        });
        await tx.wait();
        // 交易成功后更新余额
        getYdBalance();
      }
    } catch (error) {
      console.error('交易失败:', error);
      if (error instanceof Error) {
        alert(error.message);
      }
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
          onClick={handleWrap}
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
