import type { IncomingMessage, ServerResponse } from "http";
import type { TokenPair, TokenType } from "./TokenType.js";
export interface IReiJwtExtractor {
    extract(req: IncomingMessage, tokenType: TokenType): string;
    send(res: ServerResponse, tokenPair: TokenPair): void;
}
//# sourceMappingURL=IReiJwtExtractor.d.ts.map