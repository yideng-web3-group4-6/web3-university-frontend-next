import React, { useState, useCallback } from 'react';
import { SwapVert } from '@mui/icons-material';

import TokenInput from './input';

const TokenSwap: React.FC = () => {
  const [amount, setAmount] = useState('0.111');
  const [isSwapped, setIsSwapped] = useState(false);

  const yd_balance = '15.6675311530998988';
  const usdt_Balance = '4.332419825800102';

  const handleAmountChange = useCallback((value: string) => {
    setAmount(value);
  }, []);

  const handleMaxClick = () => {
    setAmount(isSwapped ? usdt_Balance : yd_balance);
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-5 relative'>
        <TokenInput
          tokenSymbol={isSwapped ? 'USDT' : 'YD'}
          balance={isSwapped ? usdt_Balance : yd_balance}
          value={amount}
          onChange={handleAmountChange}
          onMaxClick={handleMaxClick}
          showSplit={true}
        />

        <div className='bg-primary-500 rounded-full w-8 h-8 flex justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-primary-600 transition-colors'>
          <button
            onClick={handleSwap}
            className='rounded-full focus:bg-primary-600 align-middle cursor-pointer'
          >
            <SwapVert className='text-white' />
          </button>
        </div>

        <TokenInput
          tokenSymbol={isSwapped ? 'YD' : 'USDT'}
          balance={isSwapped ? yd_balance : usdt_Balance}
          value={amount}
          onChange={() => {}}
          disabled
          onMaxClick={() => {}}
          showSplit={false}
        />
      </div>
      <button className='w-full h-13 rounded-lg py-3 bg-primary-500 hover:bg-primary-600 transition-colors cursor-pointer'>
        <span className='font-bold text-white text-lg'>Wrap</span>
      </button>
    </div>
  );
};

export default TokenSwap;
