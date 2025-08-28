import type { SignOptions, VerifyOptions } from "jsonwebtoken";
import type { IReiJwtExtractor } from "./IReiJwtExtractor.js";

export interface IReiJwtOptions {
  // secret key for signing and verifying tokens
  secret: string;

  // extraction type
  extractor: IReiJwtExtractor;

  // options for access and refresh token signing
  refreshTokenOptions?: {
    signOptions?: SignOptions;
    verifyOptions?: VerifyOptions;
  };
  accessTokenOptions?: {
    signOptions?: SignOptions;
    verifyOptions?: VerifyOptions;
  };

  // status code on error
  errorStatusCode?: number;

  // debug mode activates all messages (false by default)
  debug?: boolean;
}
