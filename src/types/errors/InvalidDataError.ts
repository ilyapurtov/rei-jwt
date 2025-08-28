export class InvalidDataError extends Error {
  constructor(source: string) {
    super(`Invalid data provided in ${source}. Check your logic`);
  }
}
