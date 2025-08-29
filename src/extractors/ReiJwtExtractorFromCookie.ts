import type { IncomingMessage, ServerResponse } from "http";
import type { IReiJwtExtractor } from "@/types/IReiJwtExtractor.js";
import { ExtractionError } from "@/types/errors/ExtractionError.js";
import { CookieUtil } from "@/utils/cookieUtil.js";
import { type TokenType } from "@/types/TokenType.js";
import { HasLogger } from "@/core/types/HasLogger.js";

export class ReiJwtExtractorFromCookie
  extends HasLogger
  implements IReiJwtExtractor
{
  /**
   * @throws {ExtractionError}
   */
  extract(req: IncomingMessage, tokenType: TokenType): string {
    const cookies = CookieUtil.parseCookies(req);
    this.debug("cookies parsed:", this.json(cookies));

    if (!cookies[tokenType]) {
      throw new ExtractionError(this.json(cookies));
    } else {
      this.debug(`cookie ${tokenType} was found!`);
      return cookies[tokenType];
    }
  }
}
