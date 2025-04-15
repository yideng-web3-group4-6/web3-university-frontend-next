import { atomWithStorage } from 'jotai/utils';

export type Token = string | null;

export const tokenAtom = atomWithStorage<Token>('token', null);
