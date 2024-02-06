import { faker } from "@faker-js/faker";
import { Result } from "../../../src/common/base/Result";
import { Asset, AssetProps } from "../../../src/model_portfolio/model/Asset";

export class AssetBuilder {
  constructor(private props: Partial<AssetProps>) {}

  static create(): AssetBuilder {
    return new AssetBuilder({
      id: faker.number.int(),
      name: faker.company.name(),
      uic: faker.number.int({ min: 1 }).toString(),
    });
  }

  withName(name: string) {
    this.props.name = name;
    return this;
  }

  withUic(uic: string) {
    this.props.uic = uic;
    return this;
  }

  get(): Result<Asset> {
    return Asset.new(this.props as AssetProps);
  }

  build(): Asset {
    return this.get().instance;
  }

  toProps(): AssetProps {
    return this.props as AssetProps;
  }
}
