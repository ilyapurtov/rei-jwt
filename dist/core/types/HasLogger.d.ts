export declare abstract class HasLogger {
    protected isDebugMode: boolean;
    protected prefix: string;
    private logger;
    constructor(isDebugMode?: boolean, prefix?: string, logger?: Console);
    private format;
    protected json(value: any): string;
    protected debug(...messages: any): void;
    protected warn(...messages: any): void;
    protected error(...messages: any): void;
}
//# sourceMappingURL=HasLogger.d.ts.map