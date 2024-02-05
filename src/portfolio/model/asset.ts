import { Entity, EntityProps } from "../../common/base/entity";
import { SimpleName } from "../../common/simple_name";

export interface AssetProps extends EntityProps {
  name: string;
}

export class Asset extends Entity<AssetProps> {
  name: SimpleName;

  constructor(props: AssetProps) {
    super(props);
    this.name = new SimpleName(props.name, 1, 255);
  }
}
