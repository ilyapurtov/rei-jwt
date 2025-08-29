import type { SignOptions, VerifyOptions } from "jsonwebtoken";
import type { IReiJwtExtractor } from "./IReiJwtExtractor.js";
import { IReiJwtSender } from "./IReiJwtSender.js";

export interface IReiJwtOptions {
  /**
   * secret key for signing and verifying tokens
   */
  secret: string;

  /**
   * extractor instance
   */
  extractor: IReiJwtExtractor;

  /**
   * sender instance
   */
  sender: IReiJwtSender;

  /**
   * refresh token options for jsonwebtoken
   */
  refreshTokenOptions?: {
    signOptions?: SignOptions;
    verifyOptions?: VerifyOptions;
  };

  /**
   * access token options for jsonwebtoken
   */
  accessTokenOptions?: {
    signOptions?: SignOptions;
    verifyOptions?: VerifyOptions;
  };

  /**
   * status code on authorization error
   * @default 401
   */
  errorStatusCode?: number;

  /**
   * debug mode (activates verbose console messages)
   * @default false
   */
  debug?: boolean;
}
