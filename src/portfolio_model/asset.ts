import { Entity, EntityProps } from "../common/entity";
import { HundredPercentage } from "../common/percentage";
import { RateStars } from "../common/rate_stars";
import { UrlLink } from "../common/url_link";
import { Currency, CurrencyProps } from "../currency/currency";
import { AssetDailyShare, AssetDailyShareProps } from "./asset_daily_share";

export type AssetType = "Stock" | "ETF" | "Cash" | "Bond" | "MutualFund";

export interface AssetProps extends EntityProps {
  name: string;
  logo: string;
  description: string;
  starRate: number;
  assetType: AssetType;
  currency: CurrencyProps;
  participation: number;
  assetDailyCotations: AssetDailyShareProps[];
}

export class Asset extends Entity<Asset, AssetProps> {
  readonly name: string;
  readonly logo: UrlLink;
  readonly description: string;
  readonly starRate: RateStars;
  readonly assetType: AssetType;
  readonly currency: Currency;
  readonly participation: HundredPercentage;
  readonly assetDailyCotations: AssetDailyShare[];

  constructor(props: AssetProps) {
    super(props);
    this.name = props.name;
    this.logo = new UrlLink(props.logo);
    this.description = props.description;
    this.starRate = new RateStars(props.starRate);
    this.assetType = props.assetType;
    this.currency = new Currency(props.currency);
    this.participation = new HundredPercentage(props.participation);
    this.assetDailyCotations = props.assetDailyCotations.map(
      (props) => new AssetDailyShare(props)
    );
  }
}
