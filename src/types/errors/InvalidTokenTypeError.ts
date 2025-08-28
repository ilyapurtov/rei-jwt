import type { TokenType } from "../TokenType.js";

export class InvalidTokenTypeError extends Error {
  constructor(token: string, recievedType: any, expectedType: TokenType) {
    super(
      `Type of token ${token} is invalid. Expected: ${expectedType}. Recieved: ${recievedType}`
    );
  }
}
