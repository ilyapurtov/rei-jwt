import { IReiJwtSender } from "../types/IReiJwtSender.js";
import { TokenPair } from "../types/TokenType.js";
import { ServerResponse } from "http";
export interface BodySenderOptions {
    /**
     * Function for formatting token pair
     * as you want
     * @param {TokenPair} tokenPair
     * @returns {string}
     * @default (tokenPair) => JSON.stringify(tokenPair)
     */
    formatFunction?: (tokenPair: TokenPair) => string;
    /**
     * Content-Type header value
     * @default "application/json"
     */
    contentType?: string;
}
export declare class ReiJwtSenderToBody implements IReiJwtSender {
    protected options: Required<BodySenderOptions>;
    constructor(options?: BodySenderOptions);
    send(res: ServerResponse, pair: TokenPair): void;
}
//# sourceMappingURL=ReiJwtSenderToBody.d.ts.map