import { Result } from "../../common/base/Result";
import { UseCase } from "../../common/base/Usecase";
import { PageRequest } from "../../common/PageRequest";
import { Page } from "../../common/types/Page";
import { ModelPortfolio } from "../model/ModelPortfolio";
import { ModelPortfolioRepository } from "../provider/ModelPortfolioRepository";

interface IN extends PageRequest {
  customer_id: number;
  highlight?: boolean;
}
type OUT = Page<ModelPortfolio[]>;

export class ListModelPortfolio implements UseCase<IN, OUT> {
  constructor(private readonly repo: ModelPortfolioRepository) {}

  async execute(value: IN): Promise<Result<OUT>> {
    const portfolios = await this.repo.listModelPortfolios(value);
    if (portfolios.wentWrong) return portfolios.asFail;
    return Result.ok(portfolios.instance);
  }
}
