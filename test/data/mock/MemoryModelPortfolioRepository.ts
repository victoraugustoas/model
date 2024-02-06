import { PageRequest } from "../../../src/common/PageRequest";
import { Result } from "../../../src/common/base/Result";
import { Page } from "../../../src/common/types/Page";
import { ModelPortfolio } from "../../../src/model_portfolio/model/ModelPortfolio";
import { ModelPortfolioRepository } from "../../../src/model_portfolio/provider/ModelPortfolioRepository";

export class MemoryModelPortfolioRepo implements ModelPortfolioRepository {
  db: ModelPortfolio[] = [];

  constructor(models: ModelPortfolio[]) {
    this.db = models;
  }

  async listModelPortfolios(
    data: { customer_id: number; highlight?: boolean | undefined } & PageRequest
  ): Promise<Result<Page<ModelPortfolio[]>>> {
    let response = [...this.db];

    if (data.highlight) {
      response = response.filter((model) => model.highlighted);
    }

    if (data.filter) {
      const filters = data.filter.split(",");
      const filter = filters.flatMap((filter) =>
        response.filter((model) => model.risk_type === filter)
      );
      response = filter;
    }

    if (data.searchText) {
      response = response.filter((model) =>
        model.name.value.includes(data.searchText!)
      );
    }

    const page = data.page ?? 1;
    const limit = data.limit ?? 5;

    const result = new Page(
      page,
      response.length,
      response.slice((page - 1) * limit, (page - 1) * limit + limit)
    );
    return Result.ok(result);
  }
}
