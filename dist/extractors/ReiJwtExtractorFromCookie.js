import { ExtractionError } from "../types/errors/ExtractionError.js";
import { CookieUtil } from "../utils/cookieUtil.js";
import { HasLogger } from "../core/types/HasLogger.js";
export class ReiJwtExtractorFromCookie extends HasLogger {
    /**
     * @throws {ExtractionError}
     */
    extract(req, tokenType) {
        const cookies = CookieUtil.parseCookies(req);
        this.debug("cookies parsed:", this.json(cookies));
        if (!cookies[tokenType]) {
            throw new ExtractionError(this.json(cookies));
        }
        else {
            this.debug(`cookie ${tokenType} was found!`);
            return cookies[tokenType];
        }
    }
}
