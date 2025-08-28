export class ExtractionError extends Error {
    constructor(value) {
        super("Cannot extract token from " + value);
    }
}
