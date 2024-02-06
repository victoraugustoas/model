import { Result } from "../../../src/common/base/Result";
import { Portfolio } from "../../../src/portfolio/model/Portfolio";
import { PortfolioRepository } from "../../../src/portfolio/provider/PortfolioRepository";

export class MemoryPortfolioRepo implements PortfolioRepository {
  constructor(
    private readonly db: {
      portfolio_id: number;
      quantity: number;
      data: Portfolio;
    }[]
  ) {}

  async getPortfolioById(portfolio_id: number): Promise<Result<Portfolio>> {
    return Result.ok(
      this.db.find((portfolio) => portfolio.portfolio_id == portfolio_id)?.data
    );
  }

  async getQuantityOfAsset(
    portfolio_id: number,
    asset_id: number
  ): Promise<Result<number>> {
    return Result.ok(
      this.db.find((portfolio) => portfolio.portfolio_id == portfolio_id)
        ?.quantity
    );
  }
}
