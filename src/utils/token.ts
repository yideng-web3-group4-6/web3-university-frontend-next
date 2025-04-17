import { TOKEN_KEY } from '@/constands/common';

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const delToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
