export interface CountryProps {
  name: string;
  code: string;
}

export class Country {
  readonly name: string;
  readonly code: string;

  constructor(props: CountryProps) {
    this.name = props.name;
    this.code = props.code;
  }

  isEqual(other: Country): boolean {
    return this.name === other.name && this.code === other.code;
  }

  get isBrazil(): boolean {
    return this.code == "BR";
  }
}
