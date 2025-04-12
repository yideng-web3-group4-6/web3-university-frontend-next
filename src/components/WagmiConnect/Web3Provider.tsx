'use client';
import { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia, localhost } from 'wagmi/chains'; // 导入 sepolia 测试网
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

const config = createConfig(
  getDefaultConfig({
    // 支持的区块链
    chains: [mainnet, sepolia, localhost],
    transports: {
      // 添加ETH主网链的 RPC URL
      [mainnet.id]: http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
      // 添加 sepolia 的 RPC 配置
      [sepolia.id]: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
      // 本地链接
      [localhost.id]: http('http://127.0.0.1:8545'),
    },

    // 必需的 API 密钥
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',

    // 必需的应用信息
    appName: 'Your App Name',

    // 可选的应用信息
    appDescription: 'Your App Description', // 你的应用描述
    appUrl: 'https://family.co', // 你的应用 URL
    appIcon: 'https://family.co/logo.png', // 你的应用图标，不大于 1024x1024px（最大 1MB）
  }),
);

// 创建 React Query 客户端
const queryClient = new QueryClient();

// Web3 提供者组件
export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme='auto'
          mode='dark'
          options={{
            enforceSupportedChains: false, // 允许显示所有链，包括自定义链
            defaultChain: sepolia, // 设置默认链为 Sepolia
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
