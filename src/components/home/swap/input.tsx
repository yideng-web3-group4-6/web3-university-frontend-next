import React from "react";
import { Refresh } from "@mui/icons-material";

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
    <div className="flex flex-col p-6 rounded-lg border border-gray-700">
      {/* Input and Token Symbol */}
      <div className="flex items-center justify-between pb-8">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`flex-1 pr-4 text-2xl bg-transparent focus:outline-none ${
            disabled ? "text-gray-400" : "text-white"
          } w-1/2`}
          placeholder="0.0"
        />
        <div className="flex flex-row items-center min-w-[100px]">
          {!disabled && (
          <button
            onClick={onMaxClick}
            className="my-0 text-[#A3FF12] text-xs bg-gray-700 px-2 py-1 rounded-lg cursor-pointer"
          >
            Max
          </button>
          )}
          {showSplit &&<div className="w-[0.5px] h-5 bg-gray-500 rounded-full ml-3 mr-3"></div>}
          <h6 className="text-white text-2xl">
            {tokenSymbol}
          </h6>
        </div>
      </div>

      {/* Balance and Max Button */}
      <div className="flex flex-row justify-end">
        <p className="text-white mr-2 balance-text">
          Balance: {balance}
        </p>
        <Refresh className="text-[#A3FF12] cursor-pointer" fontSize="small" />
      </div>
    </div>
  );
};

export default TokenInput;