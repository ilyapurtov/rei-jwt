import { ServerResponse } from "http";
import { TokenPair } from "./TokenType";

/**
 * interface for token sending
 * don't forget to call res.end()
 */
export interface IReiJwtSender {
  send(res: ServerResponse, tokenPair: TokenPair): void;
}
