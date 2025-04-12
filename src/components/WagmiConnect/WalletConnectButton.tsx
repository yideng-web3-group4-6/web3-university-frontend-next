"use client";
import { ConnectKitButton } from "connectkit";
import { Wallet, CheckCircle } from "lucide-react";
import { useWalletAuth } from "@hooks/useWalletAuth";

interface WalletConnectButtonProps {
  dictionary?: Record<string, any>;
}

export const WagmiConnectButton = ({ dictionary }: WalletConnectButtonProps) => {
  const { isAuthenticated, isSigningMessage } = useWalletAuth();
  
  // 默认文本（中文）
  const defaultText = {
    connect: "连接钱包",
    signing: "签名中...",
    signVerify: "请签名验证"
  };
  
  // 使用字典中的文本，如果存在的话
  const walletText = dictionary?.wallet || defaultText;

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        const buttonText = isAuthenticated
          ? ensName || truncatedAddress
          : isSigningMessage
          ? walletText.signing
          : isConnected
          ? walletText.signVerify
          : walletText.connect;

        return (
          <button
            onClick={show}
            disabled={isSigningMessage}
            className="bg-dark-card text-cyber-blue px-6 py-2 rounded-lg text-sm font-medium flex items-center hover:shadow-neon transition-all duration-300 border border-cyber-blue/30"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {isAuthenticated ? (
              <span className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                {buttonText}
              </span>
            ) : (
              buttonText
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
