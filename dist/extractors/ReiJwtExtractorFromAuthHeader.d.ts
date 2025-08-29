import type { IncomingMessage } from "http";
import type { IReiJwtExtractor } from "../types/IReiJwtExtractor.js";
export declare class ReiJwtExtractorFromAuthHeader implements IReiJwtExtractor {
    /**
     * @throws {ExtractionError}
     */
    extract(req: IncomingMessage): string;
}
//# sourceMappingURL=ReiJwtExtractorFromAuthHeader.d.ts.map