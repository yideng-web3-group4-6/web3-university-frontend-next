"use client";
import { ConnectKitButton } from "connectkit";
import { Wallet, CheckCircle } from "lucide-react";
import { useWalletAuth } from "@hooks/useWalletAuth";
import { useTranslation } from '@/i18n/client';
import { useParams } from 'next/navigation';
import { useEffect } from "react";
import { getNonce } from "@/api/userApi";

export const WagmiConnectButton = () => {
  const { isAuthenticated, isSigningMessage, address, isConnected } = useWalletAuth();
  const params = useParams();
  const lng = params?.lng as string || 'en';
  const { t } = useTranslation(lng, 'translation');

  useEffect(() => {
    const handleLogin = async () => {
      if(address) {
        const res = await getNonce(address)
        console.log(res, '============')
      }
    }
    if(isConnected) {
      handleLogin()
    }
  }, [isConnected])

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        const buttonText = isAuthenticated
          ? ensName || truncatedAddress
          : isSigningMessage
          ? t('wallet.signing')
          : isConnected
          ? t('wallet.verify')
          : t('wallet.connect');

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
