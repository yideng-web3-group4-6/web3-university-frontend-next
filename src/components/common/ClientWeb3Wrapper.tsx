"use client";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Web3Provider = dynamic(() => import("@/components/WagmiConnect/Web3Provider"), {
  ssr: false,
  loading: () => <div>加载 Web3...</div>,
});

export function ClientWeb3Wrapper({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
