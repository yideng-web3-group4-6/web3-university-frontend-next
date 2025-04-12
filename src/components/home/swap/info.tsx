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
  const shortAddress = ydContract?.slice(0, 6) + '...' + ydContract?.slice(-4);
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
