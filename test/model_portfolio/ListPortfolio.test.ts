import { ListModelPortfolio } from "../../src/model_portfolio/usecases/ListPortfolio";
import { ModelPortfolioBuilder } from "../data/builders/ModelPortfolioBuilder";
import { MemoryModelPortfolioRepo } from "../data/mock/MemoryModelPortfolioRepository";

test("deve retornar uma listagem de portfolio", async () => {
  const repo = new MemoryModelPortfolioRepo([
    ...Array.from(Array(2)).map((_) =>
      ModelPortfolioBuilder.create().withName("SAKS Bonds Portfolio").build()
    ),
    ...Array.from(Array(98)).map((_) => ModelPortfolioBuilder.create().build()),
  ]);
  const useCase = new ListModelPortfolio(repo);

  const models = await useCase.execute({
    customer_id: 1,
    limit: 20,
    page: 1,
    searchText: "SAKS Bonds Portfolio",
  });

  expect(models.itWorked).toBeTruthy();
  expect(models.instance.total).toBe(2);
  expect(models.instance.data).toHaveLength(2);
  expect(models.instance.page).toBe(1);
});
