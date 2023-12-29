import { isAfter, isBefore, isEqual } from "date-fns";
import { Entity, EntityProps } from "../common/entity";
import { Order } from "../common/order";
import { HundredPercentage, Percentage } from "../common/percentage";
import { Currency, CurrencyProps } from "../currency/currency";
import { Asset, AssetProps } from "./asset";

export interface PortfolioModelProps extends EntityProps {
  name: string;
  description: string;
  minimumInvestment: number;
  currency: CurrencyProps;
  gracePeriod: number;
  redeemPeriod: number;
  admFee: number;
  order: number;
  highlighted: boolean;
  assets: AssetProps[];
}

export class PortfolioModel extends Entity<
  PortfolioModel,
  PortfolioModelProps
> {
  readonly name: string;
  readonly description: string;
  readonly minimumInvestment: number;
  readonly currency: Currency;
  readonly gracePeriod: number;
  readonly redeemPeriod: number;
  readonly admFee: HundredPercentage;
  readonly order: Order;
  readonly highlighted: boolean;
  readonly assets: Asset[];

  constructor(props: PortfolioModelProps) {
    super(props);

    this.name = props.name;
    this.description = props.description;
    this.minimumInvestment = props.minimumInvestment;
    this.currency = new Currency(props.currency);
    this.gracePeriod = props.gracePeriod;
    this.redeemPeriod = props.redeemPeriod;
    this.admFee = new HundredPercentage(props.admFee);
    this.order = new Order(props.order);
    this.highlighted = props.highlighted;
    this.assets = props.assets.map((props) => new Asset(props));

    const participationValid = PortfolioModel.isParticipationValid(this.assets);
    if (!participationValid) throw new Error("invalid_assets_participation");
  }

  private static isParticipationValid(assets: Asset[]): boolean {
    const participation = new HundredPercentage(
      assets.reduce(
        (participation, asset) =>
          participation + asset.participation.percentage,
        0
      )
    );

    return !(participation.percentage != 1);
  }

  private nominalProfitabilityCalc(
    initialValue: number,
    finalValue: number
  ): Percentage {
    return new Percentage((finalValue - initialValue) / initialValue);
  }

  nominalProfitability(initial: Date, finalDate: Date): Percentage[] {
    const percentages: { [key: number]: Percentage[] } = {};

    for (const asset of this.assets) {
      const cotations = asset.assetDailyCotations.filter(
        (a) =>
          (isAfter(a.date, initial) || isEqual(a.date, initial)) &&
          (isBefore(a.date, finalDate) || isEqual(a.date, finalDate))
      );
      percentages[asset.id] = [];

      for (const cotation of cotations) {
        const initialValue = cotations[0].shareValue;
        const finalValue = cotation.shareValue;

        percentages[asset.id].push(
          new Percentage(
            ((finalValue - initialValue) / initialValue) *
              asset.participation.percentage
          )
        );
      }
    }

    for (const arrayAsset of) {
      arrayAsset.reduce
    }

    return percentages;
  }
}
