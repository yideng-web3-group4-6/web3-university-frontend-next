"use client";
import { useAccount, useReadContract } from "wagmi";
import ArticleABI from "@/abis/ArticleMarket.json"; // 导入合约 ABI
import { Address } from "viem"; // 从 viem 导入 Address 类型

// 提取合约地址（确保类型安全）
const ARTICLE_CONTRACT_ADDRESS = ArticleABI.networks["1337"].address as Address;

// 定义返回类型（根据合约返回的 uint256[]）
interface ArticleIdsResponse {
  articleIds: bigint[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useArticleContract = () => {
  const walletAccount = useAccount();

  // 获取当前账户发布的文章 ID
  const { data, isLoading, error, refetch } = useReadContract({
    address: ARTICLE_CONTRACT_ADDRESS, // 合约地址
    abi: ArticleABI.abi, // 合约 ABI
    functionName: "getAuthorArticleIds", // 调用合约中的方法
    args: [walletAccount.address], // 传入当前账户地址作为参数
  });

  // 将返回的 data（bigint[]）转换为更友好的格式
  const articleIds = (data as bigint[] | undefined)?.map((id: bigint) => id.toString());

  return {
    isConnected: walletAccount.isConnected,
    address: walletAccount.address,
    getPublishedArticles: {
      articleIds, // 当前账户发布的文章 ID 列表（字符串数组）
      isLoading, // 是否正在加载
      error, // 错误信息
      refetch, // 手动重新获取数据
    } as ArticleIdsResponse,
  };
};
