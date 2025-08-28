export class InvalidDataError extends Error {
    constructor(source) {
        super(`Invalid data provided in ${source}. Check your logic`);
    }
}
