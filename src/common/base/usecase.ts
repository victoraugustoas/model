import { Result } from "./result";

export abstract class UseCase<IN, OUT> {
  abstract execute(value: IN): Promise<Result<OUT>>;
}
