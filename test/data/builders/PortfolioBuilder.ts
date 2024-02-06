import { faker } from "@faker-js/faker";
import { Result } from "../../../src/common/base/Result";
import {
  Portfolio,
  PortfolioProps,
  PortfolioStatusType,
} from "../../../src/portfolio/model/Portfolio";
import { AssetBuilder } from "./AssetBuilder";
import { ModelPortfolioBuilder } from "./ModelPortfolioBuilder";

export class PortfolioBuilder {
  constructor(private props: Partial<PortfolioProps>) {}

  static generateModelPortfolioRiskType(): PortfolioStatusType {
    const type: PortfolioStatusType[] = ["active", "rejected"];

    return type[faker.number.int({ min: 0, max: type.length - 1 })];
  }

  static create(): PortfolioBuilder {
    return new PortfolioBuilder({
      id: faker.number.int(),
      customer_id: faker.number.int(),
      account_info: { account_id: "ascascas", account_key: "ascascas" },
      balance_portfolio: {
        asset_balance: faker.number.float({ min: 0 }),
        cash_balance: faker.number.float({ min: 0 }),
      },
      model_portfolio: ModelPortfolioBuilder.create()
        .withAssets([AssetBuilder.create().withUic("1").toProps()])
        .toProps(),
      readonly: faker.datatype.boolean({ probability: 0.25 }),
      status: PortfolioBuilder.generateModelPortfolioRiskType(),
      yield: {
        yield: faker.number.float({ min: 0 }),
        yield_percentage: faker.number.float({ min: 0, max: 1 }),
      },
    });
  }

  withId(id: number) {
    this.props.id = id;
    return this;
  }

  withoutIntegrations() {
    this.props.balance_portfolio = undefined;
    this.props.yield = undefined;
    return this;
  }

  withoutAccountInfo() {
    this.props.account_info = { account_id: undefined, account_key: undefined };
    return this;
  }

  get(): Result<Portfolio> {
    return Portfolio.new(this.props as PortfolioProps);
  }

  build(): Portfolio {
    return this.get().instance;
  }

  toProps(): PortfolioProps {
    return this.props as PortfolioProps;
  }
}
