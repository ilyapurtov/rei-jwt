import type { IncomingMessage } from "http";
import type { TokenType } from "./TokenType.js";

/**
 * interface for token extraction
 */
export interface IReiJwtExtractor {
  extract(req: IncomingMessage, tokenType: TokenType): string;
}
