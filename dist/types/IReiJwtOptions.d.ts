import type { SignOptions, VerifyOptions } from "jsonwebtoken";
import type { IReiJwtExtractor } from "./IReiJwtExtractor.js";
export interface IReiJwtOptions {
    secret: string;
    extractor: IReiJwtExtractor;
    refreshTokenOptions?: {
        signOptions?: SignOptions;
        verifyOptions?: VerifyOptions;
    };
    accessTokenOptions?: {
        signOptions?: SignOptions;
        verifyOptions?: VerifyOptions;
    };
    errorStatusCode?: number;
    debug?: boolean;
}
//# sourceMappingURL=IReiJwtOptions.d.ts.map