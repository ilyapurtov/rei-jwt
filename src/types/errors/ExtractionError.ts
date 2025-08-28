export class ExtractionError extends Error {
  constructor(value: any) {
    super("Cannot extract token from " + value);
  }
}
