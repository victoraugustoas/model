import { Result } from "../base/Result";
import { VO } from "../base/ValueObject";

export class Percentage extends VO<number> {
  constructor(percentage: number) {
    super(percentage);
  }

  static new(percentage: number): Result<Percentage> {
    if (percentage > 1 || percentage < 0)
      return Result.fail("invalid_percentage_value");
    return Result.ok(new Percentage(percentage));
  }
}
