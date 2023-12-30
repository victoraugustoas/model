import { Country, CountryProps } from "../../../common/country";
import { CustomerDocumentType, DocumentData } from "./document_data";

export class BrazilDocumentDataProps {
  number?: string;
  type?: CustomerDocumentType;
  issuingDate?: Date;
  issuingState?: string;
  issuingBody?: string;
  country?: CountryProps;
}


export class BrazilDocumentData extends DocumentData {
  readonly number?: string;
  readonly type?: CustomerDocumentType;
  readonly issuingDate?: Date;
  readonly issuingState?: string;
  readonly issuingBody?: string;
  readonly country?: Country;

  constructor(props: BrazilDocumentDataProps) {
    super();
    this.number = props.number;
    this.type = props.type;
    this.issuingDate = props.issuingDate;
    this.issuingState = props.issuingState;
    this.issuingBody = props.issuingBody;
    this.country = props.country ? new Country(props.country!) : undefined;
  }
}
