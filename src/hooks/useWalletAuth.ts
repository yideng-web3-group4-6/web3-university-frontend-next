"use client";
import { useState, useEffect } from "react";
// 导入 wagmi 库的 hooks 用于钱包连接、签名和断开连接
import { useAccount, useSignMessage, useDisconnect } from "wagmi";

// 定义返回值的接口类型，明确 hook 返回的对象结构
interface UseWalletAuthReturn {
  isConnected: boolean; // 表示钱包是否已连接
  isAuthenticated: boolean; // 表示用户是否已通过签名认证
  isSigningMessage: boolean; // 表示当前是否正在进行签名操作
  handleSignature: () => Promise<void>; // 处理签名请求的异步函数
  disconnect: () => void; // 断开钱包连接的函数
  signer: string;
}

// 自定义 hook，用于管理钱包认证逻辑
export const useWalletAuth = (): UseWalletAuthReturn => {
  const { isConnected } = useAccount(); // 添加 address 和 chain
  // const { isConnected } = useAccount(); // 从 wagmi 获取钱包连接状态
  const { disconnect } = useDisconnect(); // 从 wagmi 获取断开连接的函数
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 管理认证状态，初始为未认证
  const [isSigningMessage, setIsSigningMessage] = useState(false); // 管理签名进行状态，初始为未签名
  const { signMessageAsync } = useSignMessage(); // 从 wagmi 获取异步签名函数
  const [signer, setSigner] = useState("");

  // 定义固定的签名消息内容，用于用户确认授权登录
  const signatureMessage = "确认授权登录您的web3钱包嘛?";

  // 处理签名请求
  const handleSignature = async () => {
    if (isConnected) {
      if (isAuthenticated || isSigningMessage) return;
      // 检查钱包是否已连接
      setIsSigningMessage(true); // 设置签名状态为正在进行
      try {
        // 调用签名函数，传入签名消息，等待用户签名
        const sig = await signMessageAsync({ message: signatureMessage });
        setSigner(sig);
        setIsAuthenticated(true); // 更新认证状态为已认证
      } catch (error) {
        console.error("签名错误:", error);
        // 签名被拒绝或失败，断开钱包连接
        disconnect(); // 签名失败，断开钱包连接
        setIsAuthenticated(false); // 重置认证状态为未认证
      } finally {
        setIsSigningMessage(false); // 无论成功或失败，最终结束签名状态
      }
    } else {
      alert('请先连接钱包')
    }
  };

  // 监听钱包连接状态
  useEffect(() => {
    // 定义内部异步函数，用于在适当条件下请求签名
    const requestSignature = async () => {
      // 当钱包已连接、未认证且不在签名过程中时，触发签名
      if (isConnected) {
        await handleSignature();
      }
    };
    requestSignature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  // 当连接断开时，重置认证状态
  useEffect(() => {
    if (!isConnected) {
      // 如果钱包连接断开
      setIsAuthenticated(false); // 重置认证状态为未认证
    }
  }, [isConnected]);

  return {
    isConnected, // 钱包连接状态
    isAuthenticated, // 用户认证状态
    isSigningMessage, // 签名进行状态
    handleSignature, // 手动触发签名的函数
    disconnect, // 断开钱包连接的函数
    signer,
  };
};
