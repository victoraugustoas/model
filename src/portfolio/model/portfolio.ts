import { Entity, EntityProps } from "../../common/base/entity";
import { SimpleName } from "../../common/simple_name";
import { AccountID } from "./account_id";
import { AccountKey } from "./account_key";
import { Asset, AssetProps } from "./asset";

interface PortfolioProps extends EntityProps {
  name: string;
  assets: AssetProps[];
  active: PortfolioStatusType;
  readonly: boolean;
  account_id: string;
  account_key: string;
}

type PortfolioStatusType = "active" | "rejected";

export class Portfolio extends Entity<PortfolioProps> {
  name: SimpleName;
  assets: Asset[];
  status: PortfolioStatusType;
  readonly: boolean;
  account_id: AccountID;
  account_key: AccountKey;

  constructor(props: PortfolioProps) {
    super(props);
    this.name = new SimpleName(props.name, 1, 255);
    this.assets = props.assets.map((prop) => new Asset(prop));
    this.status = props.active;
    this.readonly = props.readonly;
    this.account_id = new AccountID(props.account_id);
    this.account_key = new AccountKey(props.account_key);
  }
}
