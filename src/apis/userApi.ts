import { LoginParams, LoginRes, UserInfo } from '@/types/other/user';
import request from '@/utils/request';
import { Address } from 'viem';
 
// 获取登录签名随机数
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
// 登录 获取token
export const fetchLogin = async (data: LoginParams) => {
  const response =  await request<LoginRes>({
    method: "post",
    url: "/user/login",
    data
  });
  return response;
}

// 获取个人信息
export const getUserInfo = async () => {
  const response =  await request<UserInfo>({
    method: "get",
    url: "/user/profile",
  });
  return response;
}