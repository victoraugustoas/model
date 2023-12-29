export interface CurrencyProps {
  name: string;
  symbol: string;
  code: string;
}

export class Currency {
  readonly name: string;
  readonly symbol: string;
  readonly code: string;

  constructor(props: CurrencyProps) {
    this.name = props.name;

    if (props.symbol.length > 2)
      throw new Error("currency_symbol_length_more_than_two_characters");

    this.symbol = props.symbol;

    if (props.code.length > 3 || props.code.length < 3)
      throw new Error("invalid_currency_code_length");

    this.code = props.code;
  }
}
