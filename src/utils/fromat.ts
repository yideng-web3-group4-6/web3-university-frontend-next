export function formatWalletAddress(address?: string): string {
  if (!address) return "";
  if (address.length < 10) return address; // 防止意外传入短字符串

  return `${address.slice(0, 4)}···${address.slice(-4)}`;
}
