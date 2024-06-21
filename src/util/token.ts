import { jwtDecode }from 'jwt-decode';
import { getAuthData } from './storage';

export type TokenData = {
  exp: number;
  user_name: string;
};

export const getTokenData = (): TokenData | undefined => {
  try {
    return jwtDecode(getAuthData().access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
};
