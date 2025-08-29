import { ReiJwtSenderToBody, BodySenderOptions } from "./ReiJwtSenderToBody";
import {
  CookieSenderOptions,
  ReiJwtSenderToCookie,
} from "./ReiJwtSenderToCookie";

/**
 * Factory class
 * to create different senders
 */
export class ReiJwtSender {
  static toBody(options?: BodySenderOptions) {
    return new ReiJwtSenderToBody(options);
  }

  static toCookie(options?: CookieSenderOptions) {
    return new ReiJwtSenderToCookie(options);
  }
}
