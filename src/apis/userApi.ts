import { LoginParams, LoginRes } from '@/types/other/user';
import request from '@/utils/request';
import { Address } from 'viem';
 
export const getNonce = async (walletAddress: Address) => {
  const response =  await request<{nonce: string}>({
    method: "get",
    url: "/user/nonce",
    config: {
      params: {
        walletAddress
      },
    },
  });
  return response;
}

export const fetchLogin = async (data: LoginParams) => {
  const response =  await request<LoginRes>({
    method: "post",
    url: "/user/login",
    data
  });
  return response;
}