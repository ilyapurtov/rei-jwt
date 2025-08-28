export const enum TokenTypes {
  access = "access",
  refresh = "refresh",
}

export type TokenType = TokenTypes.access | TokenTypes.refresh;
export type TokenPair = { accessToken: string; refreshToken: string };
