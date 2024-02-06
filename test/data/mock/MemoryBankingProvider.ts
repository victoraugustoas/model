import { faker } from "@faker-js/faker";
import { Result } from "../../../src/common/base/Result";
import { BankingProvider } from "../../../src/common/provider/BankingProvider";
import { AccountInfo } from "../../../src/portfolio/model/AccountInfo";

export class MemoryBankingProvider extends BankingProvider {
  async getPortfolioDetail(
    accountInfo: AccountInfo
  ): Promise<Result<{ assets: { uic: string; current_price: number }[] }>> {
    return Result.ok({
      assets: [{ current_price: 10, uic: "1" }],
    });
  }

  async getCashBalancePortfolio(
    accountInfo: AccountInfo
  ): Promise<Result<{ unrealized_positions_value?: number | undefined }>> {
    if (accountInfo.isValid()) {
      return Result.ok({
        unrealized_positions_value: faker.number.float({ min: 0, max: 10000 }),
      });
    } else {
      return Result.fail("not_found");
    }
  }
}
