import { Result } from "../../common/base/Result";
import { UseCase } from "../../common/base/Usecase";
import { BankingProvider } from "../../common/provider/BankingProvider";
import { BalancePortfolio } from "../model/BalancePortfolio";
import { Portfolio } from "../model/Portfolio";
import { PortfolioRepository } from "../provider/PortfolioRepository";

interface IN {
  portfolio_id: number;
}

interface OUT {
  portfolio: Portfolio;
}

export class GetPortfolio implements UseCase<IN, OUT> {
  constructor(
    private readonly portfolioRepo: PortfolioRepository,
    private readonly bankingProvider: BankingProvider
  ) {}

  async execute(value: IN): Promise<Result<OUT>> {
    const portfolio = await this.portfolioRepo.getPortfolioById(
      value.portfolio_id
    );
    if (portfolio.wentWrong) return portfolio.asFail;

    const balancePortfolio = await this.getBalancePortfolio(
      value,
      portfolio.instance
    );
    if (balancePortfolio.wentWrong) return balancePortfolio.asFail;

    portfolio.instance.balance = balancePortfolio.instance;
    return Result.ok({ portfolio: portfolio.instance });
  }

  async getBalancePortfolio(
    value: IN,
    portfolio: Portfolio
  ): Promise<Result<BalancePortfolio>> {
    if (portfolio.accountInfo.isValid()) {
      const customerPortfolioBanking =
        await this.bankingProvider.getPortfolioDetail(portfolio.accountInfo);

      const assetsWithQuantity = await Promise.all(
        portfolio.model_portfolio.assets.map(async (asset) => {
          return {
            asset_uic: asset.uic,
            quantity: await this.portfolioRepo.getQuantityOfAsset(
              value.portfolio_id,
              asset.id
            ),
          };
        })
      );
      const assetBalance = assetsWithQuantity.reduce((acc, asset) => {
        const assetBroker: any = Array.from(
          customerPortfolioBanking.instance.assets
        ).find((assetBroker: any) => assetBroker.uic === asset.asset_uic);

        return acc + asset.quantity.instance * assetBroker.current_price;
      }, 0);

      const customerBalanceSaxo =
        await this.bankingProvider.getCashBalancePortfolio(
          portfolio.accountInfo
        );

      if (customerBalanceSaxo.wentWrong) return customerBalanceSaxo.asFail;

      return BalancePortfolio.new({
        asset_balance: assetBalance,
        cash_balance: customerBalanceSaxo.instance.unrealized_positions_value,
      });
    } else {
      return Result.fail("invalid_portfolio_account_info");
    }
  }
}
