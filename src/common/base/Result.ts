import { Erro } from "./Erro";

export class Result<T> {
  constructor(private readonly _instance?: T | null, private _erros?: Erro[]) {}

  static ok<T>(instancia?: T): Result<T> {
    return new Result<T>(instancia ?? null);
  }

  static null(): Result<null> {
    return new Result<null>(null);
  }

  static fail<T>(e: string | Erro | Erro[]): Result<T> {
    const erro = typeof e === "string" ? [{ tipo: e } as Erro] : e;
    return new Result<T>(undefined, Array.isArray(erro) ? erro : [erro]);
  }

  static toFail<T>(e: any): Result<T> {
    return Result.fail<T>({ tipo: e.message ?? e });
  }

  static async try<T>(fn: () => Promise<Result<T>>): Promise<Result<T>> {
    try {
      return fn();
    } catch (e: any) {
      return Result.toFail<T>(e);
    }
  }

  static trySync<T>(fn: () => T): Result<T> {
    try {
      return Result.ok<T>(fn());
    } catch (e: any) {
      return Result.toFail<T>(e);
    }
  }

  throwErrorIfError(): never | void {
    if (this.wentWrong) {
      throw this.errors;
    }
  }

  get instance(): T {
    return this._instance!;
  }

  get errors(): Erro[] | undefined {
    const withoutErrors = !this._erros || this._erros.length === 0;
    if (withoutErrors && this._instance === undefined) {
      return [{ tipo: "Result_UNDEFINED" }];
    }
    return this._erros;
  }

  get itWorked(): boolean {
    return !this.errors;
  }

  get wentWrong(): boolean {
    return !!this.errors;
  }

  get asFail(): Result<any> {
    return Result.fail<any>(this.errors!);
  }

  static combine<T>(Results: Result<T>[]): Result<T[]> {
    const errors = Results.filter((r) => r.wentWrong);
    const instances = Results.map((r) => r._instance);
    return errors.length > 0
      ? Result.fail<T[]>(errors.flatMap((r) => r.errors!))
      : Result.ok<T[]>(instances as T[]);
  }

  static async combineAsync<T>(
    Results: Promise<Result<T>>[]
  ): Promise<Result<T[]>> {
    const rs = await Promise.all(Results);
    return Result.combine(rs);
  }
}
