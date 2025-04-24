'use client';
import { useYiDengToken } from '@/hooks/useYiDengToken';
import { useCallback, useState } from 'react';
import { Address } from 'viem';

interface TransferYDTokenProps {
  transferToAccount: Address | undefined;
}

export default function TransferYDToken({ transferToAccount }: TransferYDTokenProps) {
  const { tokenBalance, handlrTransferYDToken } = useYiDengToken();
  const [rewradAmount, setRewardAmount] = useState<string>('');
  const [isTransfer, setIsTransfer] = useState(false);

  const handleReward = useCallback(() => {
    if (isTransfer) return;
    if (+rewradAmount > tokenBalance) return;
    if (!transferToAccount) return;
    setIsTransfer(true);
    handlrTransferYDToken(rewradAmount, transferToAccount);
  }, []);

  return (
    <div className='space-y-4'>
      <p className='text-white text-lg'>Balance: {tokenBalance} YD</p>
      <div>
        <label className='block text-white mb-2'>打赏数量 (YD):</label>
        <input
          type='number'
          placeholder='0.0'
          value={rewradAmount}
          className='
            w-full p-2
            bg-dark-card text-white
            border border-[rgba(0,243,255,0.1)]
            rounded-md
            focus:outline-none focus:border-cyber-blue
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          '
          onChange={e => setRewardAmount(e.target.value)}
        />
      </div>
      <button
        className='
          w-full p-2
          bg-primary-600 text-white
          rounded-md
          hover:bg-primary-500
          shadow-neon
          transition-all duration-300
        '
        onClick={handleReward}
      >
        确定打赏
      </button>
    </div>
  );
}
