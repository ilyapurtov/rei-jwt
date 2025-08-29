import { HasLogger } from "@/core/types/HasLogger";
import { ICookieOptions } from "@/types/ICookieOptions";
import { IReiJwtSender } from "@/types/IReiJwtSender";
import { TokenPair, TokenTypes } from "@/types/TokenType";
import { CookieUtil } from "@/utils/cookieUtil";
import { ServerResponse } from "http";
import ms from "ms";

export interface CookieSenderOptions extends Omit<ICookieOptions, "maxAge"> {
  /**
   * Max age for access token cookie
   * @default "10m"
   */
  accessTokenMaxAge?: ms.StringValue;

  /**
   * Max age for refresh token cookie
   * @default "24h"
   */
  refreshTokenMaxAge?: ms.StringValue;

  /**
   * Display debug messages?
   * @default false
   */
  debug?: boolean;

  /**
   * Allow only https cookies?
   * @default false
   */
  secure?: boolean;

  /**
   * If true, cookies cannot be accessed
   * from javascript on client side
   * @default true
   */
  httpOnly?: boolean;

  /**
   * Path for cookies
   * @default "/"
   */
  path?: string;

  /**
   * SameSite rule for cookies
   * @default "Strict"
   */
  sameSite?: "None" | "Strict" | "Lax";

  /**
   * Domain for cookies
   * @default undefined
   */
  domain?: string;
}

export const defaultOptions: CookieSenderOptions = {
  accessTokenMaxAge: "10m",
  refreshTokenMaxAge: "24h",
  secure: false,
  httpOnly: true,
  path: "/",
  sameSite: "Strict",
  debug: false,
};

export class ReiJwtSenderToCookie extends HasLogger implements IReiJwtSender {
  protected options: Required<CookieSenderOptions>;

  constructor(options?: CookieSenderOptions) {
    // for debugging messsages
    super(options?.debug === true, "ReiJwtSenderToCookie:");

    this.options = Object.assign(
      {},
      defaultOptions,
      options
    ) as Required<CookieSenderOptions>;

    this.debug("Initialized with options", this.json(this.options));
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
