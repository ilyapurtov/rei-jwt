import { ExtractionError } from "../types/errors/ExtractionError.js";
export class ReiJwtExtractorFromAuthHeader {
    /**
     * @throws {ExtractionError}
     */
    extract(req) {
        const authorization = req.headers.authorization;
        const parts = authorization?.split(" ", 2) || [];
        if (!parts[1]) {
            throw new ExtractionError(req.headers.authorization);
        }
        else {
            return parts[1];
        }
    }
}
