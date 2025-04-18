import { TOKEN_KEY } from '@/constands/common';
import { atomWithStorage } from 'jotai/utils';
import { atomWithImmer } from 'jotai-immer'
import { UserInfo } from '@/types/other/user';

export type Token = string | null;

export const tokenAtom = atomWithStorage<Token>(TOKEN_KEY, null);

export const userInfoAtom = atomWithImmer<UserInfo | null>(null)
