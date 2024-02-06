import { Erro } from "../../src/common/base/Erro";
import { Result } from "../../src/common/base/Result";
import { ListModelPortfolio } from "../../src/model_portfolio/usecases/ListModelPortfolio";
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

test("deve retornar erro ao fazer a listagem", async () => {
  const repo = new MemoryModelPortfolioRepo([
    ...Array.from(Array(2)).map((_) =>
      ModelPortfolioBuilder.create().withName("SAKS Bonds Portfolio").build()
    ),
    ...Array.from(Array(98)).map((_) => ModelPortfolioBuilder.create().build()),
  ]);
  const useCase = new ListModelPortfolio(repo);

  jest
    .spyOn(repo, "listModelPortfolios")
    .mockImplementation(() => Promise.resolve(Result.fail("gRPC unavailable")));

  const models = await useCase.execute({
    customer_id: 1,
    limit: 20,
    page: 1,
    searchText: "SAKS Bonds Portfolio",
  });

  expect(models.itWorked).toBeFalsy();
  expect(models.wentWrong).toBeTruthy();
  expect(models.errors).toStrictEqual([{ tipo: "gRPC unavailable" } as Erro]);
});
