export interface IAuthTokenInfo {
  exp: number;
  iat: number;
  login: string;
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  try {
    const tokenInfo = token.split(".")[1];
    const tokenInfoDecoded = JSON.parse(atob(tokenInfo));
    const { exp }: IAuthTokenInfo = tokenInfoDecoded;

    return exp < Math.floor(new Date().getTime() / 1000) + 10;
  } catch (e) {
    console.error(e);
    return true;
  }
};
