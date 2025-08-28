import { ReiJwtExtractorFromAuthHeader } from "./extractors/ReiJwtExtractorFromAuthHeader.js";
import { ReiJwtExtractorFromCookie, } from "./extractors/ReiJwtExtractorFromCookie.js";
/**
 * Factory class for creating
 * different extractors
 */
export class ReiJwtExtractor {
    static fromAuthHeaderAsBearerToken() {
        return new ReiJwtExtractorFromAuthHeader();
    }
    static fromCookie(options) {
        return new ReiJwtExtractorFromCookie(options);
    }
}
