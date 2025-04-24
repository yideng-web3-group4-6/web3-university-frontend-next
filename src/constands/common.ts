export const TOKEN_KEY = 'yideng_token';

interface TokenAddressMap {
  [key: number]: `0x${string}`; // 允许任意数字键
  1337: `0x${string}`;
  11155111: `0x${string}`;
  1: `0x${string}`;
}
export const YD_TOKEN_ADDRESS: TokenAddressMap = {
  // 1337: '0xf0D22f11e49e9bcfB433d40074f5d1504BaE0694', // AShu-Win-公司 本地 
  1337: '0x2cd99DD1804F1D0B1a704e3D112A15f27b2851f0', // AShu-Mac 本地
  11155111: '0xd9F7DF682095aB0C07740a23269085ca0F08b3EF',
  1: '0x....'
}
