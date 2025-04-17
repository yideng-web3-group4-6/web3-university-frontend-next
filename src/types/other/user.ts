import { Address } from 'viem';

export type LoginParams = {
  walletAddress: Address;
  signature: string;
  nonce: string;
};

export type LoginRes = {
  access_token: string;
};

export interface UserInfo {
  avatarUrl: symbol;
  createdAt: Date;
  email: string;
  id: number;
  nickname: string;
  nonce: string;
  role: string;
  updatedAt: Date;
  walletAddress: Address;
}
