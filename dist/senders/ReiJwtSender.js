import { ReiJwtSenderToBody } from "./ReiJwtSenderToBody.js";
import { ReiJwtSenderToCookie, } from "./ReiJwtSenderToCookie.js";
/**
 * Factory class
 * to create different senders
 */
export class ReiJwtSender {
    static toBody(options) {
        return new ReiJwtSenderToBody(options);
    }
    static toCookie(options) {
        return new ReiJwtSenderToCookie(options);
    }
}
