export class Page<T> {
  constructor(
    readonly page: number,
    readonly total: number,
    readonly data: T
  ) {}
}
