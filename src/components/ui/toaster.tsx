'use client';

import { useEffect, useState } from 'react';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from '@/components/ui/toast';

export function Toaster() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastDescription, setToastDescription] = useState('');
  const [toastVariant, setToastVariant] = useState<'default' | 'destructive'>('default');

  useEffect(() => {
    const handleShowToast = (event: CustomEvent) => {
      const { title, description, variant } = event.detail;
      setToastTitle(title);
      setToastDescription(description);
      setToastVariant(variant);
      setToastOpen(true);
    };

    window.addEventListener('show-toast', handleShowToast as EventListener);
    return () => {
      window.removeEventListener('show-toast', handleShowToast as EventListener);
    };
  }, []);

  return (
    <ToastProvider>
      <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
        <ToastTitle>{toastTitle}</ToastTitle>
        <ToastDescription>{toastDescription}</ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
