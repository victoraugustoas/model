import { Result } from "../../common/base/Result";
import { Portfolio } from "../model/Portfolio";

export abstract class PortfolioRepository {
  abstract getPortfolioById(portfolio_id: number): Promise<Result<Portfolio>>;
  abstract getQuantityOfAsset(
    portfolio_id: number,
    asset_id: number
  ): Promise<Result<number>>;
}
