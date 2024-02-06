import { GetPortfolio } from "../../src/portfolio/usecases/GetPortfolio";
import { PortfolioBuilder } from "../data/builders/PortfolioBuilder";
import { MemoryBankingProvider } from "../data/mock/MemoryBankingProvider";
import { MemoryPortfolioRepo } from "../data/mock/MemoryPortfolioRepository";

test("deve retornar um portfolio", async () => {
  const portfolioRepo = new MemoryPortfolioRepo([
    {
      portfolio_id: 1,
      data: PortfolioBuilder.create().withId(1).withoutIntegrations().build(),
      quantity: 2,
    },
  ]);
  const bankingProvider = new MemoryBankingProvider();

  const useCase = new GetPortfolio(portfolioRepo, bankingProvider);
  const result = await useCase.execute({ portfolio_id: 1 });

  expect(result.instance.portfolio.balance?.value.asset_balance).toBe(20);
});

test("deve retornar erro sem informações da conta", async () => {
  const portfolioRepo = new MemoryPortfolioRepo([
    {
      portfolio_id: 1,
      data: PortfolioBuilder.create()
        .withId(1)
        .withoutAccountInfo()
        .withoutIntegrations()
        .build(),
      quantity: 2,
    },
  ]);
  const bankingProvider = new MemoryBankingProvider();

  const useCase = new GetPortfolio(portfolioRepo, bankingProvider);
  const result = await useCase.execute({ portfolio_id: 1 });

  expect(result.errors).toEqual([{ tipo: "invalid_portfolio_account_info" }]);
});
