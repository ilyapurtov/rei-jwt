import type { IncomingMessage, ServerResponse } from "http";
import type { ICookieOptions } from "../types/ICookieOptions.js";
export declare class CookieUtil {
    static parseCookies(req: IncomingMessage): Record<string, string>;
    static setCookies(res: ServerResponse, cookies: {
        cookieName: string;
        cookieValue: string;
        options: ICookieOptions;
    }[]): void;
}
//# sourceMappingURL=cookieUtil.d.ts.map