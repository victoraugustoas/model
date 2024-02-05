import { Result } from "../../common/base/result";
import { Portfolio } from "../model/portfolio";

export abstract class RepositoryPortfolio {
  abstract listPortfolios(customer_id: number): Promise<Result<Portfolio[]>>;
}
