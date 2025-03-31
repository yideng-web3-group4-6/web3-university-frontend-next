"use client";
import { useWalletConnect } from "./useWalletConnect";
import { metamask } from "./initWallet";
export default function WalletConnectButton() {
  const { disconnectWallet, connectWallet, isActive, isActivating, error } = useWalletConnect(metamask);
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
        {isActivating ? "Connecting..." : isActive ? "Disconnect" : error ? "Try Again" : "Connect Wallet"}
      </button>
    </>
  );
}
