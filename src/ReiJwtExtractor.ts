import { ReiJwtExtractorFromAuthHeader } from "@/extractors/ReiJwtExtractorFromAuthHeader.js";
import {
  ReiJwtExtractorFromCookie,
  type CookieExtractorOptions,
} from "@/extractors/ReiJwtExtractorFromCookie.js";

/**
 * Factory class for creating
 * different extractors
 */
export class ReiJwtExtractor {
  static fromAuthHeaderAsBearerToken() {
    return new ReiJwtExtractorFromAuthHeader();
  }

  static fromCookie(options: CookieExtractorOptions) {
    return new ReiJwtExtractorFromCookie(options);
  }
}
