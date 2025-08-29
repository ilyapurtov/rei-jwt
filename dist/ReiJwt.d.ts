import { type IncomingMessage, type ServerResponse } from "http";
import type { IReiJwtOptions } from "./types/IReiJwtOptions.js";
import { TokenPair, type TokenType } from "./types/TokenType.js";
import { HasLogger } from "./core/types/HasLogger.js";
export declare class ReiJwt<PayloadType = any> extends HasLogger {
    options: IReiJwtOptions;
    constructor(options: IReiJwtOptions);
    /**
     * returns middleware for verifying access token
     * */
    middleware(): (req: IncomingMessage, res: ServerResponse, next: () => void) => void;
    /**
     * returns handler function for refreshing token pair,
     * accepts refresh token
     */
    refresher(): (req: IncomingMessage, res: ServerResponse) => any;
    /**
     * method for signing access and refresh tokens
     * and sending them to client
     */
    signAndSend(payload: PayloadType, res: ServerResponse): TokenPair;
    /**
     * method for signing access and refresh tokens
     */
    sign(payload: PayloadType): TokenPair;
    /**
     * method for verifying token
     */
    protected verify(token: string, tokenType: TokenType): PayloadType;
    /**
     * method for getting payload
     * available after authorization middleware
     */
    getPayload(req: IncomingMessage): PayloadType;
    /**
     * static version of getPayload method for convenience
     */
    static getPayload<PayloadType = any>(req: IncomingMessage): PayloadType;
}
//# sourceMappingURL=ReiJwt.d.ts.map