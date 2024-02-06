import { Entity, EntityProps } from "../../common/base/Entity";
import { Result } from "../../common/base/Result";
import { SimpleName } from "../../common/types/SimpleName";

export interface AssetProps extends EntityProps {
  name: string;
}

export class Asset extends Entity<AssetProps> {
  private constructor(readonly id: number, readonly name: SimpleName) {
    super(id);
  }

  static newList(props: AssetProps[]): Result<Asset[]> {
    return Result.combine(props.map((prop) => Asset.new(prop)));
  }

  static new(props: AssetProps): Result<Asset> {
    const name = SimpleName.new(props.name, 1, 255);

    const createAttr = Result.combine([name]);
    if (createAttr.wentWrong) return createAttr.asFail;

    return Result.ok(new Asset(props.id, name.instance));
  }
}
