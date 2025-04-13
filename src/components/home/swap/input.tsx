import React from 'react';
import { Refresh } from '@mui/icons-material';

import './style.css';

interface TokenInputProps {
  tokenSymbol: string;
  balance: string;
  value: string;
  onChange: (value: string) => void;
  onMaxClick: () => void;
  disabled?: boolean;
  showSplit?: boolean;
}

const TokenInput: React.FC<TokenInputProps> = ({
  tokenSymbol,
  balance,
  value,
  onChange,
  onMaxClick,
  disabled = false,
  showSplit,
}) => {
  return (
    <div className='flex flex-col p-6 rounded-lg border border-primary-700/30 bg-dark-800/50 backdrop-blur-sm hover:border-primary-600/50 transition-all'>
      {/* Input and Token Symbol */}
      <div className='flex items-center justify-between pb-8'>
        <input
          type='text'
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={`flex-1 pr-4 text-2xl bg-transparent focus:outline-none ${
            disabled ? 'text-gray-400' : 'text-white'
          } w-1/2`}
          placeholder='0.0'
        />
        <div className='flex flex-row items-center min-w-[100px]'>
          {/* {!disabled && (
            <button
              onClick={onMaxClick}
              className='my-0 text-primary-400 text-xs bg-primary-900/50 px-2 py-1 rounded-lg cursor-pointer hover:bg-primary-800/50'
            >
              Max
            </button>
          )} */}
          {showSplit && (
            <div className='w-[0.5px] h-5 bg-primary-700/50 rounded-full ml-3 mr-3'></div>
          )}
          <h6 className='text-white text-2xl'>{tokenSymbol}</h6>
        </div>
      </div>

      {/* Balance and Refresh */}
      <div className='flex flex-row justify-end'>
        <p className='text-primary-400 mr-2 balance-text'>
          Balance: {parseFloat(balance).toFixed(2)}
        </p>
        <Refresh
          className='text-primary-400 cursor-pointer hover:text-primary-300 transition-colors'
          fontSize='small'
        />
      </div>
    </div>
  );
};

export default TokenInput;
