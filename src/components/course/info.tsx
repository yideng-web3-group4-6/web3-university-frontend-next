import React from 'react';
import { WagmiConnectButton } from '@/components/WagmiConnect/WalletConnectButton';
import { useAccount } from 'wagmi';

const Info = () => {
  const { isConnected } = useAccount();
  return (
    !isConnected && (
      <div className='flex flex-col justify-center items-center mt-5 mb-5'>
        <h1 className='text-3xl text-white pb-2 pt-2'>Start Your web3 course Journey Now!</h1>
        <p className='text-xl text-white'>Join the ongoing and future events to elevate our community to new heights.</p>
        <p className='text-xl text-white mb-10'>Connect your crypto wallet to buy courses and start your web3 journey.</p>
        <WagmiConnectButton showIcon={false} />
      </div>
    )
  );
};

export default Info;
