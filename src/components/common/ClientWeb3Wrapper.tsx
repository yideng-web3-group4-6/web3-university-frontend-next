'use client';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { LoadingScreen } from './LoadingScreen';

const Web3Provider = dynamic(() => import('@/components/WagmiConnect/Web3Provider'));

export function ClientWeb3Wrapper({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
