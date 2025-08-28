export class InvalidTokenTypeError extends Error {
    constructor(token, recievedType, expectedType) {
        super(`Type of token ${token} is invalid. Expected: ${expectedType}. Recieved: ${recievedType}`);
    }
}
