import { faker } from "@faker-js/faker";
import { Result } from "../../../src/common/base/Result";
import {
  ModelPortfolio,
  ModelPortfolioProps,
  PortfolioRiskType,
} from "../../../src/model_portfolio/model/ModelPortfolio";
import { AssetBuilder } from "./AssetBuilder";

export class ModelPortfolioBuilder {
  constructor(private props: Partial<ModelPortfolioProps>) {}

  static generateModelPortfolioName(): string {
    const names = [
      "Suno Wealth Moderado",
      "Suno Wealth Arrojado",
      "Saks Sector Rotation Portfolio",
      "Saks Blue Chip Portfolio",
      "Saks Balanced Portfolio",
      "V10 Renda Fixa Internacional",
      "V10 ETFs Internacionais",
      "Suno Wealth Conservador",
      "General Investing",
      "Cubby Black conservador",
      "Optimize Global Flexible",
      "BlackRock Conservador",
      "V10 Ações Internacionais",
      "Saks Bonds Portfolio",
      "Check Treasury Bond Portfolio",
      "Meu Patrimônio Conservador Internacional",
      "Meu Patrimônio Moderada Internacional",
      "Cubby Black Moderado",
      "Cubby Black Arrojado",
      "Meu Patrimônio Arrojada Internacional",
      "Meu Patrimônio Balanceada Internacional",
      "Meu Patrimônio Dinâmica Internacional",
      "Golden Hind Cautious",
      "Optimize Global Bond",
      "Optimize Europe Value",
      "Optimize Invest Selection",
      "BlackRock Moderado",
      "BlackRock Agressivo",
      "Patrimônio Ações Internacionais",
      "Patrimônio Renda Fixa Internacional",
      "Portfólio da Iza",
      "VWS Conservador",
      "VWS Arrojado",
      "VWS Agressivo",
      "Saks Yield Portfolio",
    ];

    return names[faker.number.int({ min: 0, max: names.length - 1 })];
  }

  static generateModelPortfolioRiskType(): PortfolioRiskType {
    const type: PortfolioRiskType[] = [
      "aggressive",
      "conservative",
      "moderate",
    ];

    return type[faker.number.int({ min: 0, max: type.length - 1 })];
  }

  static create(): ModelPortfolioBuilder {
    return new ModelPortfolioBuilder({
      id: faker.number.int(),
      active: faker.datatype.boolean({ probability: 0.75 }),
      // minimo 0,25% e máximo de 3%
      adm_fee: faker.number.float({ min: 0.0025, max: 0.03 }),
      description: faker.lorem.text(),
      grace_period: faker.number.int({ min: 1, max: 30 }),
      highlighted: faker.datatype.boolean({ probability: 0.25 }),
      minimum_investment: faker.number.float({ min: 1000, max: 10000 }),
      name: ModelPortfolioBuilder.generateModelPortfolioName(),
      order: faker.number.int({ min: 1, max: 1000 }),
      redeem_period: faker.number.int({ min: 1, max: 30 }),
      risk_type: ModelPortfolioBuilder.generateModelPortfolioRiskType(),
      assets: [AssetBuilder.create().toProps()],
    });
  }

  withName(name: string) {
    this.props.name = name;
    return this;
  }

  get(): Result<ModelPortfolio> {
    return ModelPortfolio.new(this.props as ModelPortfolioProps);
  }

  build(): ModelPortfolio {
    return this.get().instance;
  }

  toProps(): ModelPortfolioProps {
    return this.props as ModelPortfolioProps;
  }
}
