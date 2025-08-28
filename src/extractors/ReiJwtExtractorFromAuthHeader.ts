import type { IncomingMessage, ServerResponse } from "http";
import type { IReiJwtExtractor } from "../types/IReiJwtExtractor.js";
import { ExtractionError } from "../types/errors/ExtractionError.js";
import { TokenPair } from "@/types/TokenType.js";

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

  send(res: ServerResponse, pair: TokenPair) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(pair));
  }
}
