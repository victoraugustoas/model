import { Entity, EntityProps } from "../../common/base/Entity";
import { Result } from "../../common/base/Result";
import { ModelPortfolio } from "../../model_portfolio";
import { ModelPortfolioProps } from "../../model_portfolio/model/ModelPortfolio";
import { AccountInfo, AccountInfoProps } from "./AccountInfo";
import { BalancePortfolio, BalancePortfolioProps } from "./BalancePortfolio";
import { YieldPortfolio, YieldPortfolioProps } from "./YieldPortfolio";

export interface PortfolioProps extends EntityProps {
  customer_id: number;
  model_portfolio: ModelPortfolioProps;
  status: PortfolioStatusType;
  readonly: boolean;
  account_info: AccountInfoProps;
  yield: YieldPortfolioProps;
  balance_portfolio?: BalancePortfolioProps;
}

export type PortfolioStatusType = "active" | "rejected";

export class Portfolio extends Entity<PortfolioProps> {
  private constructor(
    readonly id: number,
    readonly customer_id: number,
    readonly model_portfolio: ModelPortfolio,
    readonly status: PortfolioStatusType,
    readonly readonly: boolean,
    readonly accountInfo: AccountInfo,
    readonly yieldValue?: YieldPortfolio,
    private _balance?: BalancePortfolio
  ) {
    super(id);
  }

  static new(props: PortfolioProps): Result<Portfolio> {
    const modelPortfolio = ModelPortfolio.new(props.model_portfolio);
    const accountInfo = AccountInfo.new(props.account_info);

    const balancePortfolio = props.balance_portfolio
      ? BalancePortfolio.new(props.balance_portfolio)
      : null;
    const yieldPortfolio = props.yield ? YieldPortfolio.new(props.yield) : null;

    const createAttrs = Result.combine<any>([
      modelPortfolio,
      accountInfo,
      ...(balancePortfolio ? [balancePortfolio] : []),
      ...(yieldPortfolio ? [yieldPortfolio] : []),
    ]);
    if (createAttrs.wentWrong) return createAttrs.asFail;

    return Result.ok(
      new Portfolio(
        props.id,
        props.customer_id,
        modelPortfolio.instance,
        props.status,
        props.readonly,
        accountInfo.instance,
        yieldPortfolio?.instance,
        balancePortfolio?.instance
      )
    );
  }

  set balance(balance: BalancePortfolio) {
    this._balance = balance;
  }

  get balance(): BalancePortfolio | null {
    return this._balance ?? null;
  }
}
