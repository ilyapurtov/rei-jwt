import { ReiJwtExtractorFromAuthHeader } from "../extractors/ReiJwtExtractorFromAuthHeader.js";
import { ReiJwtExtractorFromCookie } from "../extractors/ReiJwtExtractorFromCookie.js";
/**
 * Factory class to create
 * different extractors
 */
export declare class ReiJwtExtractor {
    static fromAuthHeaderAsBearerToken(): ReiJwtExtractorFromAuthHeader;
    static fromCookie(): ReiJwtExtractorFromCookie;
}
//# sourceMappingURL=ReiJwtExtractor.d.ts.map