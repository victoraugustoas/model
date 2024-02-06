import { Result } from "../../common/base/Result";
import { PageRequest } from "../../common/PageRequest";
import { Page } from "../../common/types/Page";
import { ModelPortfolio } from "../model/ModelPortfolio";

export abstract class ModelPortfolioRepository {
  abstract listPortfolios(
    data: { customer_id: number; highlight?: boolean } & PageRequest
  ): Promise<Result<Page<ModelPortfolio[]>>>;
}
