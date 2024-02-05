export class Result<T> {
  constructor(readonly value: T) {}

  static ok<T>(value: T): Result<T> {
    return new Result(value);
  }

  fail() {}
}
