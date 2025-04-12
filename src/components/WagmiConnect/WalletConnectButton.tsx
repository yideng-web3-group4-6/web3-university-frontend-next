'use client';
import { ConnectKitButton } from 'connectkit';
import { Wallet, CheckCircle, LogOut, Coins } from 'lucide-react';
import { useWalletAuth } from '@hooks/useWalletAuth';
import { useTranslation } from '@/i18n/client';
import { useParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { shortenAddress } from '@/lib/utils';
import { useBalance, useAccount } from 'wagmi';
import { formatEther } from 'viem';

export const WagmiConnectButton = () => {
  const { isAuthenticated, isSigningMessage } = useWalletAuth();
  const params = useParams();
  const lng = (params?.lng as string) || 'en';
  const { t } = useTranslation(lng, 'translation');
  const { address } = useAccount();

  const { data: ethBalance } = useBalance({
    address: address,
  });

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

        if (isAuthenticated) {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`
                    px-6 py-2.5 rounded-lg text-sm font-medium flex items-center
                    transition-all duration-300 relative overflow-hidden
                    bg-primary-600/20 text-primary-400 hover:bg-primary-600/30
                    disabled:opacity-50 disabled:cursor-not-allowed
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-400/20 before:to-secondary-400/20 before:opacity-0 before:transition-opacity
                    hover:before:opacity-100
                    hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]
                  `}
                >
                  <Avatar className='h-5 w-5 mr-2'>
                    <AvatarImage src={`https://avatar.vercel.sh/${address}.png`} />
                    <AvatarFallback className='bg-primary-900 text-white text-xs'>
                      {truncatedAddress?.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {buttonText}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-56 bg-dark-800/95 border border-primary-500/20 text-white'
                align='end'
                forceMount
              >
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium'>{ensName || 'Web3 User'}</p>
                    <p className='text-xs text-gray-400 font-mono'>
                      {shortenAddress(address || '')}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-primary-500/20' />
                <DropdownMenuGroup>
                  <DropdownMenuItem className='flex justify-between cursor-default'>
                    <div className='flex items-center'>
                      <Coins className='mr-2 h-4 w-4 text-primary-400' />
                      <span>ETH Balance</span>
                    </div>
                    <span>
                      {ethBalance ? formatEther(ethBalance?.value).slice(0, 6) : '0.00'} ETH
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className='bg-primary-500/20' />
                <DropdownMenuItem
                  className='text-red-400 focus:text-red-400 focus:bg-red-500/10'
                  onClick={show}
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <button
            onClick={show}
            disabled={isSigningMessage}
            className={`
              px-6 py-2.5 rounded-lg text-sm font-medium flex items-center
              transition-all duration-300 relative overflow-hidden
              bg-primary-600 text-white hover:bg-primary-500
              disabled:opacity-50 disabled:cursor-not-allowed
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-400/20 before:to-secondary-400/20 before:opacity-0 before:transition-opacity
              hover:before:opacity-100
              hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]
            `}
          >
            <Wallet className='h-4 w-4 mr-2 text-white' />
            {buttonText}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
