import type { IncomingMessage } from "http";
import type { IReiJwtExtractor } from "@/types/IReiJwtExtractor.js";
import { ExtractionError } from "@/types/errors/ExtractionError.js";

export class ReiJwtExtractorFromAuthHeader implements IReiJwtExtractor {
  /**
   * @throws {ExtractionError}
   */
  extract(req: IncomingMessage): string {
    const authorization = req.headers.authorization;
    const parts = authorization?.split(" ", 2) || [];

    if (!parts[1]) {
      throw new ExtractionError(req.headers.authorization);
    } else {
      return parts[1];
    }
  }
}
