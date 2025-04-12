'use client';

import React from 'react';

import SwapContent from './content';
import SwapInfo from './info';
import './style.css';
import { useAccount } from 'wagmi';

const Index: React.FC = () => {
  const { address, isConnected } = useAccount();
  return (
    <div className='wrap-area p-8 mx-4 mt-10 mb-5 relative rounded-lg md:w-[486px] md:mt-15 md:mb-5 gap-10 flex flex-col justify-between'>
      <SwapContent />
      <SwapInfo exchangeRate='1000' ydContract={address} />
    </div>
  );
};

export default Index;
