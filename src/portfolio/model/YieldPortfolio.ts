import { Result } from "../../common/base/Result";
import { VO } from "../../common/base/ValueObject";
import { Percentage } from "../../common/types/Percentage";

export interface YieldPortfolioProps {
  yield?: number;
  yield_percentage?: number;
}

interface YieldPortfolioValue {
  yield?: number;
  yield_percentage?: Percentage;
}

export class YieldPortfolio extends VO<YieldPortfolioValue> {
  private constructor(value: YieldPortfolioValue) {
    super(value);
  }

  static new(props: YieldPortfolioProps): Result<YieldPortfolio> {
    const yield_percentage = Percentage.new(props.yield_percentage ?? 0);

    const errors = Result.combine([yield_percentage]);
    if (errors.wentWrong) return errors.asFail;

    return Result.ok(
      new YieldPortfolio({
        yield: props.yield,
        yield_percentage: yield_percentage.instance,
      })
    );
  }
}
