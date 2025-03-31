"use client";
import { useWalletConnect } from "./useWalletConnect";
import { metamask } from "./initWallet";
import { Wallet, CheckCircle } from "lucide-react";
import { formatWalletAddress } from "@/utils/fromat";
export default function WalletConnectButton() {
  const { disconnectWallet, connectWallet, isActive, isActivating, error, account } = useWalletConnect(metamask);
  const handleConnect = () => {
    if (!isActive) {
      connectWallet();
    } else {
      disconnectWallet();
    }
  };

  return (
    <>
      <button
        onClick={handleConnect}
        className="bg-dark-card text-cyber-blue px-6 py-2 rounded-lg text-sm font-medium flex items-center hover:shadow-neon transition-all duration-300 border border-cyber-blue/30"
      >
        <Wallet className="h-4 w-4 mr-2" />
        <span className="flex items-center">
          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
          {isActivating
            ? "Connecting..."
            : isActive
            ? formatWalletAddress(account)
            : error
            ? "Try Again"
            : "Connect Wallet"}
        </span>
      </button>
    </>
  );
}
