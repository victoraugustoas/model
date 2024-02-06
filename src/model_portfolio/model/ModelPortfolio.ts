import { Entity, EntityProps } from "../../common/base/Entity";
import { Result } from "../../common/base/Result";
import { Order } from "../../common/types/Order";
import { Percentage } from "../../common/types/Percentage";
import { SimpleName } from "../../common/types/SimpleName";
import { Asset, AssetProps } from "./Asset";

export interface ModelPortfolioProps extends EntityProps {
  name: string;
  assets: AssetProps[];
  risk_type: PortfolioRiskType;
  description: string;
  minimum_investment: number;
  grace_period: number;
  redeem_period: number;
  adm_fee: number;
  active: boolean;
  highlighted: boolean;
  // currency: CurrencyProps;
  order: number;
}

export type PortfolioRiskType = "conservative" | "moderate" | "aggressive";

export class ModelPortfolio extends Entity<ModelPortfolioProps> {
  private constructor(
    readonly id: number,
    readonly name: SimpleName,
    readonly assets: Asset[],
    readonly adm_fee: Percentage,
    readonly order: Order,
    readonly risk_type: PortfolioRiskType,
    readonly description: string,
    readonly minimum_investment: number,
    readonly grace_period: number,
    readonly redeem_period: number,
    readonly active: boolean,
    readonly highlighted: boolean // readonly currency: CurrencyProps
  ) {
    super(id);
  }

  static new(props: ModelPortfolioProps): Result<ModelPortfolio> {
    const name = SimpleName.new(props.name, 1, 255);
    const assets = Asset.newList(props.assets);
    const adm_fee = Percentage.new(props.adm_fee);
    const order = Order.new(props.order);

    const createAttrs = Result.combine<any>([name, assets, adm_fee, order]);
    if (createAttrs.wentWrong) return createAttrs.asFail;

    return Result.ok(
      new ModelPortfolio(
        props.id,
        name.instance,
        assets.instance,
        adm_fee.instance,
        order.instance,
        props.risk_type,
        props.description,
        props.minimum_investment,
        props.grace_period,
        props.redeem_period,
        props.active,
        props.highlighted
      )
    );
  }
}
