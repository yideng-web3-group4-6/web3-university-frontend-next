"use client";
import { useCallback, useEffect, useState } from "react"; // 获取 状态处理器
import type { MetaMask } from "@web3-react/metamask"; // 获取 钱包类型
import { hooks } from "@/components/Wallet/initWallet"; // 获取钱包实例钩子函数

import { getAddChainParameters } from "@/utils/chains"; // 获取 区块链信息

const { useChainId, useIsActivating, useIsActive, useAccount } = hooks;

// 定义 EthereumProvider 类型
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

export function useWalletConnect(connector: MetaMask) {
  const chainId = useChainId(); // 获取链id
  const isActivating = useIsActivating(); // 获取钱包连接中的状态
  const isActive = useIsActive(); // 获取钱包是否处于活跃状态
  const account = useAccount(); // 获取当前的账户
  const [error, setError] = useState<Error | undefined>(undefined); // 存储连接过程中的错误信息
  const [desiredChainId, setDesiredChainId] = useState<number>(1); // 存储用户期望的链 ID，初始值为 0
  useEffect(() => {
    // 当 chainId 或 desiredChainId 变化时，同步 desiredChainId
    if (chainId && (!desiredChainId || desiredChainId === -1)) {
      setDesiredChainId(chainId);
    }
  }, [desiredChainId, chainId]);

  // 连接钱包
  const connectWallet = useCallback(
    async (chainId?: number) => {
      // 检查 window.ethereum 是否存在（MetaMask 注入的对象）
      const ethereum = window.ethereum as EthereumProvider | undefined;
      if (!ethereum) {
        // 如果 MetaMask 未安装，设置错误
        setError(new Error("MetaMask is not installed"));
        return;
      }
      // 使用传入的 chainId 或默认的 desiredChainId
      const targetChainId = chainId ?? desiredChainId;
      // 更新期望的链 ID
      setDesiredChainId(targetChainId);

      try {
        // 如果目标链 ID 与当前链 ID 相同，或目标链 ID 为 -1 且当前链已连接，则无需操作
        if (targetChainId === chainId || (targetChainId === -1 && chainId !== undefined)) {
          setError(undefined); // 清除错误状态
          return;
        }
        // 请求用户授权连接账户
        await ethereum.request({ method: "eth_requestAccounts" });
        // 根据目标链 ID 执行连接逻辑
        if (targetChainId === -1) {
          await connector.activate(); // 如果目标链 ID 为 -1，直接激活连接器
        } else {
          // 激活连接器并切换到指定链
          await connector.activate(getAddChainParameters(targetChainId));
        }
        setError(undefined); // 连接成功，清除错误状态
      } catch (err) {
        console.error("Failed to connect wallet:", err);
        setError(err as Error);
      }
    },
    [connector, desiredChainId]
  );

  // 断开连接
  const disconnectWallet = useCallback(async () => {
    if (connector?.deactivate) {
      await connector.deactivate(); // 如果连接器支持 deactivate 方法，调用它
    } else {
      await connector.resetState(); // 否则重置连接器状态
    }
    setDesiredChainId(-1); // 将期望链 ID 重置为 -1，表示未连接
    setError(undefined);
  }, [connector]);

  // 组件挂载时尝试自动连接（Eager Connect）
  useEffect(() => {
    connector.connectEagerly().catch((err) => {
      console.debug("Failed to connect eagerly to MetaMask:", err);
    });
  }, [connector]);

  return {
    connectWallet,
    disconnectWallet,
    isActivating,
    isActive,
    error,
    chainId: desiredChainId,
    setChainId: setDesiredChainId,
    account,
  };
}
