import { ReiJwtExtractorFromAuthHeader } from "./extractors/ReiJwtExtractorFromAuthHeader.js";
import { ReiJwtExtractorFromCookie, type CookieExtractorOptions } from "./extractors/ReiJwtExtractorFromCookie.js";
/**
 * Factory class for creating
 * different extractors
 */
export declare class ReiJwtExtractor {
    static fromAuthHeaderAsBearerToken(): ReiJwtExtractorFromAuthHeader;
    static fromCookie(options: CookieExtractorOptions): ReiJwtExtractorFromCookie;
}
//# sourceMappingURL=ReiJwtExtractor.d.ts.map