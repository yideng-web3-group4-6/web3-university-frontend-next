'use client';

import { LoadingProvider } from '@/context/LoadingContext';
import LoadingOverlay from './LoadingOverlay';
import { useState, ReactNode, useEffect } from 'react';
import { useGlobalLoading } from '@/hooks/useGlobalLoading';

interface LoadingWrapperProps {
  children: ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('加载中...');
  const isQueryLoading = useGlobalLoading();

  const showLoading = (customMessage?: string) => {
    setMessage(customMessage || '加载中...');
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const loadingValue = {
    isLoading,
    message,
    showLoading,
    hideLoading,
  };

  return (
    <LoadingProvider value={loadingValue}>
      {children}
      <LoadingOverlay isVisible={isLoading || isQueryLoading} message={message} />
    </LoadingProvider>
  );
}
