import { ReiJwtSenderToBody, BodySenderOptions } from "./ReiJwtSenderToBody.js";
import { CookieSenderOptions, ReiJwtSenderToCookie } from "./ReiJwtSenderToCookie.js";
/**
 * Factory class
 * to create different senders
 */
export declare class ReiJwtSender {
    static toBody(options?: BodySenderOptions): ReiJwtSenderToBody;
    static toCookie(options?: CookieSenderOptions): ReiJwtSenderToCookie;
}
//# sourceMappingURL=ReiJwtSender.d.ts.map