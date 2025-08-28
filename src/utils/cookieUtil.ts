import type { IncomingMessage, ServerResponse } from "http";
import type { ICookieOptions } from "../types/ICookieOptions.ts";

export class CookieUtil {
  static parseCookies(req: IncomingMessage): Record<string, string> {
    const list: Record<string, string> = {};
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split("; ").forEach((cookie) => {
      const [name, value] = cookie.split("=", 2);
      if (!name || !value) return;
      list[name] = decodeURIComponent(value);
    });

    return list;
  }

  static setCookies(
    res: ServerResponse,
    cookies: {
      cookieName: string;
      cookieValue: string;
      options: ICookieOptions;
    }[]
  ) {
    res.setHeader(
      "Set-Cookie",
      cookies.map(
        ({ cookieName, cookieValue, options }) =>
          `${cookieName}=${cookieValue}; ` +
          (options.httpOnly ? "HttpOnly; " : "") +
          (options.path ? `Path=${options.path}; ` : "") +
          (options.sameSite ? `SameSite=${options.sameSite}; ` : "") +
          (options.secure ? `Secure; ` : "") +
          (options.maxAge ? `Max-Age=${options.maxAge}; ` : "") +
          (options.domain ? `Domain=${options.domain}` : "")
      )
    );
  }
}
