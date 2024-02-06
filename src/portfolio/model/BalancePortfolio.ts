import { Result } from "../../common/base/Result";
import { VO } from "../../common/base/ValueObject";

export interface BalancePortfolioProps {
  asset_balance?: number;
  cash_balance?: number;
}

export class BalancePortfolio extends VO<BalancePortfolioProps> {
  private constructor(props: BalancePortfolioProps) {
    super(props);
  }

  static new(props: BalancePortfolioProps): Result<BalancePortfolio> {
    const assetBalance =
      props.asset_balance && props.asset_balance < 0
        ? "negative_balance_assets"
        : null;
    const cashBalance =
      props.cash_balance && props.cash_balance < 0
        ? "negative_cash_balance"
        : null;

    const errors = assetBalance || cashBalance;

    return errors
      ? Result.fail(errors)
      : Result.ok(new BalancePortfolio(props));
  }
}
