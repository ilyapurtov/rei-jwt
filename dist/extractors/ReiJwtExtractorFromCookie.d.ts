import type { IncomingMessage, ServerResponse } from "http";
import type { IReiJwtExtractor } from "../types/IReiJwtExtractor.js";
import { TokenPair, type TokenType } from "../types/TokenType.js";
import ms from "ms";
import type { ICookieOptions } from "../types/ICookieOptions.js";
import { HasLogger } from "../core/types/HasLogger.js";
export interface CookieExtractorOptions extends Omit<ICookieOptions, "maxAge"> {
    accessTokenMaxAge: ms.StringValue;
    refreshTokenMaxAge: ms.StringValue;
    debug?: boolean;
}
export declare const defaultOptions: CookieExtractorOptions;
export declare class ReiJwtExtractorFromCookie extends HasLogger implements IReiJwtExtractor {
    protected options: Required<CookieExtractorOptions>;
    constructor(options: CookieExtractorOptions);
    /**
     * @throws {ExtractionError}
     */
    extract(req: IncomingMessage, tokenType: TokenType): string;
    send(res: ServerResponse, pair: TokenPair): void;
}
//# sourceMappingURL=ReiJwtExtractorFromCookie.d.ts.map