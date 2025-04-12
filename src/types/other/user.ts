import { Address } from "viem"

export type LoginParams = {
  walletAddress: Address,
  signature: string,
  nonce: string
}

export type LoginRes = {
  access_token: string
}