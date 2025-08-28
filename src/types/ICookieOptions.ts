export interface ICookieOptions {
  secure?: boolean;
  httpOnly?: boolean;
  path?: string;
  sameSite?: "None" | "Strict" | "Lax";
  maxAge?: number;
  domain?: string;
}
