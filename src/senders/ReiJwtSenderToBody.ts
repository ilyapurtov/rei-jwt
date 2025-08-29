import { IReiJwtSender } from "@/types/IReiJwtSender";
import { TokenPair } from "@/types/TokenType";
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

const defaultOptions: BodySenderOptions = {
  formatFunction: (tokenPair) => JSON.stringify(tokenPair),
  contentType: "application/json",
};

export class ReiJwtSenderToBody implements IReiJwtSender {
  protected options: Required<BodySenderOptions>;

  constructor(options?: BodySenderOptions) {
    this.options = Object.assign(
      {},
      defaultOptions,
      options
    ) as Required<BodySenderOptions>;
  }

  send(res: ServerResponse, pair: TokenPair) {
    res.setHeader("Content-Type", this.options.contentType);
    res.statusCode = 200;
    res.end(this.options.formatFunction(pair));
  }
}
