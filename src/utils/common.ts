import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BigNumber } from '@ethersproject/bignumber';

const RMB_TO_YIDENG_RATE = 10; // 假设 1 RMB = 10 $YD

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transitionBigNumber(num: number) {
  return BigNumber.from(num).mul(RMB_TO_YIDENG_RATE).toString();
}
