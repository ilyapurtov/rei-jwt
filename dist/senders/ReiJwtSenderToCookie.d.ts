import { HasLogger } from "../core/types/HasLogger.js";
import { ICookieOptions } from "../types/ICookieOptions.js";
import { IReiJwtSender } from "../types/IReiJwtSender.js";
import { TokenPair } from "../types/TokenType.js";
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
export declare const defaultOptions: CookieSenderOptions;
export declare class ReiJwtSenderToCookie extends HasLogger implements IReiJwtSender {
    protected options: Required<CookieSenderOptions>;
    constructor(options?: CookieSenderOptions);
    send(res: ServerResponse, pair: TokenPair): void;
}
//# sourceMappingURL=ReiJwtSenderToCookie.d.ts.map