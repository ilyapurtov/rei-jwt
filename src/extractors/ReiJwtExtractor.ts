import { ReiJwtExtractorFromAuthHeader } from "@/extractors/ReiJwtExtractorFromAuthHeader.js";
import { ReiJwtExtractorFromCookie } from "@/extractors/ReiJwtExtractorFromCookie.js";

/**
 * Factory class to create
 * different extractors
 */
export class ReiJwtExtractor {
  static fromAuthHeaderAsBearerToken() {
    return new ReiJwtExtractorFromAuthHeader();
  }

  static fromCookie() {
    return new ReiJwtExtractorFromCookie();
  }
}
