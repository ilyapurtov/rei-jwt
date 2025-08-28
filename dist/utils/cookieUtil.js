export class CookieUtil {
    static parseCookies(req) {
        const list = {};
        const cookieHeader = req.headers.cookie;
        if (!cookieHeader)
            return list;
        cookieHeader.split("; ").forEach((cookie) => {
            const [name, value] = cookie.split("=", 2);
            if (!name || !value)
                return;
            list[name] = decodeURIComponent(value);
        });
        return list;
    }
    static setCookies(res, cookies) {
        res.setHeader("Set-Cookie", cookies.map(({ cookieName, cookieValue, options }) => `${cookieName}=${cookieValue}; ` +
            (options.httpOnly ? "HttpOnly; " : "") +
            (options.path ? `Path=${options.path}; ` : "") +
            (options.sameSite ? `SameSite=${options.sameSite}; ` : "") +
            (options.secure ? `Secure; ` : "") +
            (options.maxAge ? `Max-Age=${options.maxAge}; ` : "") +
            (options.domain ? `Domain=${options.domain}` : "")));
    }
}
