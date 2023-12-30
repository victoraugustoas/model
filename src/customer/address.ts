import { Entity, EntityProps } from "../common/entity";

export interface AddressProps extends EntityProps {
  zipcode: string;
}

export class Address extends Entity<Address, AddressProps> {
  readonly zipcode: string;

  constructor(props: AddressProps) {
    super(props);

    if (props.zipcode.trim().length == 0) throw new Error("invalid_zipcode");
    this.zipcode = props.zipcode;
  }
}
