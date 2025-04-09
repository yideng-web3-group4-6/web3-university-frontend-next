'use client';

import React, { useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { CoinType } from '@/mockData/courseData';
import { useYiDengToken } from '@/hooks/useYiDengToken';
import { useTranslation } from '@/i18n/client';

interface ExchangeSectionProps {
  exchangeRates: Record<CoinType, BigNumber>;
  lng: string;
}

const ExchangeSection: React.FC<ExchangeSectionProps> = ({ exchangeRates, lng }) => {
  const { t } = useTranslation(lng);
  const { buyTokensWithETH } = useYiDengToken();
  const [ethAmount, setEthAmount] = useState<string>('');
  const [selectedCoin, setSelectedCoin] = useState<CoinType>('ETH');

  let yidengAmount = '0.00';

  try {
    if (ethAmount && !isNaN(parseFloat(ethAmount))) {
      const amountBN = BigNumber.from(Math.floor(parseFloat(ethAmount) * 100));
      const currentRate = exchangeRates[selectedCoin];
      const yidengAmountBN = amountBN.mul(currentRate);
      yidengAmount = (yidengAmountBN.toNumber() / 100).toFixed(2);
    }
  } catch (error) {
    console.error('Error calculating yidengAmount:', error);
  }

  const handleExchange = async () => {
    try {
      if (!ethAmount || parseFloat(ethAmount) <= 0) {
        alert(t('alert.invalidAmount'));
        return;
      }
      const res = await buyTokensWithETH(ethAmount);
      console.log(res, '购买代币结果');
      setEthAmount('');
    } catch (error) {
      alert(t('alert.exchangeFailed'));
      console.error('Error during exchange:', error);
    }
  };

  return (
    <div className='hero-gradient flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8'>
      <div className='text-center max-w-4xl mx-auto'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue to-cyber-purple mb-4'>
          {t('exchangeSection.mainTitle')}
        </h1>
        <p className='text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12'>
          {t('exchangeSection.mainDescription')}
        </p>

        <div className='bg-dark-card p-6 sm:p-8 rounded-xl border border-cyber-blue/30 shadow-neon'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-cyber-blue mb-6'>
            {t('exchangeSection.areaTitle')}
          </h2>
          <p className='text-lg sm:text-xl mb-6 text-gray-300'>
            {t('exchangeSection.rateInfoPrefix', { coin: selectedCoin })}
            <span className='text-cyber-blue font-semibold'>
              {exchangeRates[selectedCoin].toString()}
            </span>{' '}
            $YD
          </p>
          <div className='flex flex-col items-center gap-4'>
            <div className='w-full max-w-md flex flex-col sm:flex-row gap-3'>
              <input
                type='number'
                value={ethAmount}
                onChange={e => setEthAmount(e.target.value)}
                placeholder={t('exchangeSection.inputPlaceholder', { coin: selectedCoin })}
                className='flex-1 bg-dark-card text-white px-4 py-3 rounded-lg border border-cyber-blue/50 focus:outline-none focus:ring-2 focus:ring-cyber-blue/70 hover:border-cyber-blue transition-all duration-300'
              />
              <select
                value={selectedCoin}
                onChange={e => setSelectedCoin(e.target.value as CoinType)}
                className='bg-dark-card text-white px-4 py-3 rounded-lg border border-cyber-blue/50 focus:outline-none focus:ring-2 focus:ring-cyber-blue/70 hover:border-cyber-blue transition-all duration-300'
              >
                <option value='ETH'>ETH</option>
                <option value='BTC'>BTC</option>
                <option value='USDT'>USDT</option>
                <option value='BNB'>BNB</option>
              </select>
            </div>
            <p className='text-lg sm:text-xl text-gray-300'>
              {t('exchangeSection.expectedAmountPrefix')}{' '}
              <span className='text-cyber-blue font-bold'>{yidengAmount}</span> $YD
            </p>
            <button
              onClick={handleExchange}
              className='bg-transparent border-2 border-cyber-blue text-cyber-blue px-8 py-3 rounded-lg font-medium hover:bg-gradient-to-r hover:from-cyber-blue/20 hover:to-cyber-purple/20 hover:text-white hover:border-cyber-purple hover:shadow-neon transition-all duration-300'
            >
              {t('exchangeSection.exchangeButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSection;
