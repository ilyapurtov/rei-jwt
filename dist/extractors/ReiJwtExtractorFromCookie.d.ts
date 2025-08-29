import type { IncomingMessage } from "http";
import type { IReiJwtExtractor } from "../types/IReiJwtExtractor.js";
import { type TokenType } from "../types/TokenType.js";
import { HasLogger } from "../core/types/HasLogger.js";
export declare class ReiJwtExtractorFromCookie extends HasLogger implements IReiJwtExtractor {
    /**
     * @throws {ExtractionError}
     */
    extract(req: IncomingMessage, tokenType: TokenType): string;
}
//# sourceMappingURL=ReiJwtExtractorFromCookie.d.ts.map