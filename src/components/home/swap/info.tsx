import { CopyIcon } from 'lucide-react';
import React, { useCallback } from 'react';

interface ExchangeInfoProps {
  exchangeRate: string;
  ydContract: string;
  showCopy?: boolean;
  onCopy?: () => void;
}

const ExchangeInfo: React.FC<ExchangeInfoProps> = ({
  showCopy = true,
  onCopy,
  exchangeRate,
  ydContract,
}) => {
  const handleCopy = useCallback(() => {
    if (onCopy) {
      onCopy();
    }
  }, [onCopy]);
  const tokenAddress = '0xb26BA51DAcc2F8e59CB87ECCD2eC73a2C3540d6f';
  const shortAddress = tokenAddress
    ? tokenAddress?.slice(0, 6) + '...' + tokenAddress?.slice(-4)
    : '0x0000000000000000000000000000000000000000';
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
