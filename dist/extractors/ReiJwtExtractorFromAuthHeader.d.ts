import type { IncomingMessage, ServerResponse } from "http";
import type { IReiJwtExtractor } from "../types/IReiJwtExtractor.js";
import { TokenPair } from "../types/TokenType.js";
export declare class ReiJwtExtractorFromAuthHeader implements IReiJwtExtractor {
    /**
     * @throws {ExtractionError}
     */
    extract(req: IncomingMessage): string;
    send(res: ServerResponse, pair: TokenPair): void;
}
//# sourceMappingURL=ReiJwtExtractorFromAuthHeader.d.ts.map