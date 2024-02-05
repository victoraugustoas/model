import { Result } from "../../common/base/result";
import { UseCase } from "../../common/base/usecase";
import { Portfolio } from "../model/portfolio";
import { RepositoryPortfolio } from "../provider/RepositoryPortfolio";

interface IN {
  customer_id: number;
}
interface OUT {
  portfolios: Portfolio[];
}

export class ListPortfolio implements UseCase<IN, OUT> {
  constructor(readonly repo: RepositoryPortfolio) {}

  async execute(value: IN): Promise<Result<OUT>> {
    const portfolios = await this.repo.listPortfolios(value.customer_id);
    return Result.ok({ portfolios: portfolios.value });
  }
}
