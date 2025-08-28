export declare abstract class HasLogger {
    protected isDebugMode: boolean;
    protected prefix: string;
    private logger;
    constructor(isDebugMode?: boolean, prefix?: string, logger?: Console);
    private format;
    json(value: any): string;
    debug(...messages: any): void;
    warn(...messages: any): void;
    error(...messages: any): void;
}
//# sourceMappingURL=HasLogger.d.ts.map