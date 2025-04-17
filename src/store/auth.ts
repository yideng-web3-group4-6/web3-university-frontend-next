import { TOKEN_KEY } from '@/constands/common';
import { atomWithStorage } from 'jotai/utils';

export type Token = string | null;

export const tokenAtom = atomWithStorage<Token>(TOKEN_KEY, null);
