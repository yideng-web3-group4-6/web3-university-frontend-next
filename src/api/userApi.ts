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
// export const fetchLogin = (address: Address) => {
//   return 
// }