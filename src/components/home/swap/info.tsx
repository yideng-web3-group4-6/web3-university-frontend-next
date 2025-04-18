import { CopyIcon } from 'lucide-react';
import React, { useCallback } from 'react';
import { useAccount } from 'wagmi';

interface ExchangeInfoProps {
  exchangeRate: string; // 默认的对率，，
  showCopy?: boolean;
  onCopy?: () => void;
}

/**
 * 置换资产模块底部 兑换率 及 合约地址展示
 * */
const ExchangeInfo: React.FC<ExchangeInfoProps> = ({ showCopy = true, onCopy, exchangeRate }) => {
  const { address: ydContract } = useAccount();

  const handleCopy = useCallback(() => {
    if (onCopy) {
      onCopy();
    }
  }, [onCopy]);
  const shortAddress = ydContract
    ? ydContract?.slice(0, 6) + '...' + ydContract?.slice(-4)
    : '0x000....00';
  return (
    <div className='text-gray-400 text-sm mt-2 mb-2'>
      <div className='flex justify-between mb-2'>
        <span>Exchange Rate</span>
        <span>{exchangeRate}</span>
      </div>
      <div className='flex justify-between mb-2'>
        <span>XZK Contract</span>
        <div className='flex items-center space-x-1'>
          <span>{shortAddress}</span>
          {showCopy && (
            <span>
              <CopyIcon onClick={handleCopy} fontSize={12} className='cursor-pointer' />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeInfo;
