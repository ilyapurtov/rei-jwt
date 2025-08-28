import type { TokenType } from "./TokenType.js";

export type RawTokenPayload<PayloadType> = PayloadType & {
  type: TokenType;
  iat: number;
  exp: number;
};
