import { AccountInfo } from "../../portfolio/model/AccountInfo";
import { Result } from "../base/Result";

export abstract class BankingProvider {
  abstract getPortfolioDetail(accountInfo: AccountInfo): Promise<Result<any>>;
  abstract getCashBalancePortfolio(
    accountInfo: AccountInfo
  ): Promise<Result<{ unrealized_positions_value?: number }>>;
}
