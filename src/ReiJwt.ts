import { type IncomingMessage, type ServerResponse } from "http";
import type { IReiJwtOptions } from "@/types/IReiJwtOptions.js";
import jwt from "jsonwebtoken";
import { TokenPair, TokenTypes, type TokenType } from "@/types/TokenType.js";
import { InvalidTokenTypeError } from "@/types/errors/InvalidTokenTypeError.js";
import { HasLogger } from "@/core/types/HasLogger.js";
import { JWT_PAYLOAD_HEADER } from "@/constants.js";
import { InvalidDataError } from "@/types/errors/InvalidDataError.js";
import type { RawTokenPayload } from "@/types/RawTokenPayload.js";

export class ReiJwt<PayloadType = any> extends HasLogger {
  constructor(public options: IReiJwtOptions) {
    // debug mode for logging
    super(options.debug === true, "ReiJwt:");

    // error status code
    if (!options.errorStatusCode) {
      options.errorStatusCode = 401;
    }

    this.debug("ReiJwt initialized with options", this.json(options));
  }

  /**
   * returns middleware for verifying access token
   * */
  middleware() {
    return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      try {
        // 1. extracting token
        const token = this.options.extractor.extract(req, TokenTypes.access);

        this.debug(`Access token ${token} successfully extracted`);

        // 2. verifying token
        const payload = this.verify(token, TokenTypes.access);

        this.debug(
          `Access token ${token} successfully verified. Payload: ${this.json(
            payload
          )}`
        );

        // 3. providing payload to headers
        req.headers[JWT_PAYLOAD_HEADER] = this.json(payload);

        this.debug(`${JWT_PAYLOAD_HEADER} header set`);

        // 4. calling next middleware or handler
        next();
      } catch (e) {
        res.statusCode = this.options.errorStatusCode!;
        res.end("Unathorized");
        this.error(e);
      }
    };
  }

  /**
   * returns handler function for refreshing token pair,
   * accepts refresh token
   */
  refresher() {
    return (req: IncomingMessage, res: ServerResponse): any => {
      try {
        // 1. extracting token
        const token = this.options.extractor.extract(req, TokenTypes.refresh);

        this.debug(`Refresh token ${token} successfully extracted`);

        // 2. verifying token
        const payload = this.verify(token, TokenTypes.refresh);

        this.debug(
          `Refresh token ${token} successfully verifed. Payload: ${this.json(
            payload
          )}`
        );

        // 3. signing and sending new token pair
        this.signAndSend(payload, res);
      } catch (e) {
        res.statusCode = this.options.errorStatusCode!;
        res.end("Unathorized");
        this.error(e);
      }
    };
  }

  /**
   * method for signing access and refresh tokens
   * and sending them to client
   */
  signAndSend(payload: PayloadType, res: ServerResponse): TokenPair {
    // signing new token pair
    const pair = this.sign(payload);

    this.debug(`New token pair was signed: ${this.json(pair)}`);

    // sending tokens
    this.options.sender.send(res, pair);

    this.debug(`New token pair was sent: ${this.json(pair)}`);

    // returning token pair
    return pair;
  }

  /**
   * method for signing access and refresh tokens
   */
  sign(payload: PayloadType): TokenPair {
    const accessToken = jwt.sign(
      { ...payload, type: TokenTypes.access },
      this.options.secret,
      this.options.accessTokenOptions?.signOptions
    );
    const refreshToken = jwt.sign(
      { ...payload, type: TokenTypes.refresh },
      this.options.secret,
      this.options.refreshTokenOptions?.signOptions
    );

    return { accessToken, refreshToken };
  }

  /**
   * method for verifying token
   */
  protected verify(token: string, tokenType: TokenType): PayloadType {
    const payload = jwt.verify(
      token,
      this.options.secret,
      this.options.refreshTokenOptions?.verifyOptions
    ) as RawTokenPayload<PayloadType>;

    if (payload.type != tokenType) {
      throw new InvalidTokenTypeError(token, payload.type, tokenType);
    }

    const { exp, iat, type, ...cleanPayload } = payload;
    return cleanPayload as PayloadType;
  }

  /**
   * method for getting payload
   * available after authorization middleware
   */
  getPayload(req: IncomingMessage): PayloadType {
    const payload = ReiJwt.getPayload<PayloadType>(req);
    this.debug(`Payload was recieved: ${this.json(payload)}`);

    return payload;
  }

  /**
   * static version of getPayload method for convenience
   */
  static getPayload<PayloadType = any>(req: IncomingMessage): PayloadType {
    const header = req.headers[JWT_PAYLOAD_HEADER];
    if (typeof header !== "string") {
      throw new InvalidDataError("header " + JWT_PAYLOAD_HEADER);
    }

    const payload = JSON.parse(header) as PayloadType;

    return payload;
  }
}
