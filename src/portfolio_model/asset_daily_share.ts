export interface AssetDailyShareProps {
  date: Date;
  shareValue: number;
}

export class AssetDailyShare {
  readonly date: Date;
  readonly shareValue: number;

  constructor(props: AssetDailyShareProps) {
    if (props.shareValue < 0) throw new Error("asset_daily_share_negative");
    this.date = props.date;
    this.shareValue = props.shareValue;
  }
}
