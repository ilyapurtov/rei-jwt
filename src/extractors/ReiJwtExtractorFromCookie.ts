import type { IncomingMessage, ServerResponse } from "http";
import type { IReiJwtExtractor } from "../types/IReiJwtExtractor.js";
import { ExtractionError } from "../types/errors/ExtractionError.js";
import { CookieUtil } from "../utils/cookieUtil.js";
import { TokenPair, TokenTypes, type TokenType } from "../types/TokenType.js";
import ms from "ms";
import type { ICookieOptions } from "../types/ICookieOptions.js";
import { HasLogger } from "@/core/types/HasLogger.js";

export interface CookieExtractorOptions extends Omit<ICookieOptions, "maxAge"> {
  accessTokenMaxAge: ms.StringValue;
  refreshTokenMaxAge: ms.StringValue;
  debug?: boolean;
}

export const defaultOptions: CookieExtractorOptions = {
  accessTokenMaxAge: "10m",
  refreshTokenMaxAge: "24h",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  path: "/",
  sameSite: "Strict",
};

export class ReiJwtExtractorFromCookie
  extends HasLogger
  implements IReiJwtExtractor
{
  protected options: Required<CookieExtractorOptions>;

  constructor(options: CookieExtractorOptions) {
    // for debugging messsages
    super(options.debug === true, "ReiJwtExtractorFromCookie:");

    this.options = Object.assign(
      {},
      defaultOptions,
      options
    ) as Required<CookieExtractorOptions>;

    this.debug("Initialized with options", this.json(this.options));
  }

  /**
   * @throws {ExtractionError}
   */
  extract(req: IncomingMessage, tokenType: TokenType): string {
    const cookies = CookieUtil.parseCookies(req);
    this.debug("cookies parsed:", this.json(cookies));

    if (!cookies[tokenType]) {
      throw new ExtractionError(this.json(cookies));
    } else {
      this.debug(`cookie ${tokenType} was found!`);
      return cookies[tokenType];
    }
  }

  send(res: ServerResponse, pair: TokenPair) {
    const accessTokenMaxAge = ms(this.options.accessTokenMaxAge) / 1000;
    const refreshTokenMaxAge = ms(this.options.refreshTokenMaxAge) / 1000;

    const accessCookie = {
      cookieName: TokenTypes.access,
      cookieValue: pair.accessToken,
      options: { ...this.options, maxAge: accessTokenMaxAge },
    };
    const refreshCookie = {
      cookieName: TokenTypes.refresh,
      cookieValue: pair.refreshToken,
      options: { ...this.options, maxAge: refreshTokenMaxAge },
    };

    this.debug(`sending access token cookie: ${this.json(accessCookie)}`);
    this.debug(`sending refresh token cookie: ${this.json(refreshCookie)}`);

    CookieUtil.setCookies(res, [accessCookie, refreshCookie]);
    this.debug(`cookie headers were set: ${res.getHeaders()["set-cookie"]}`);

    res.statusCode = 200;
    res.end();
  }
}
