import { CountryProps, Country } from "../../../common/country";
import { CustomerDocumentType, DocumentData } from "./document_data";

export interface LatamDocumentDataProps {
  number?: string;
  type?: CustomerDocumentType;
  country?: CountryProps;
}

export class LatamDocumentData extends DocumentData {
  readonly number?: string;
  readonly type?: CustomerDocumentType;
  readonly country?: Country;

  constructor(props: LatamDocumentDataProps) {
    super();
    this.number = props.number;
    this.type = props.type;
    this.country = props.country ? new Country(props.country!) : undefined;
  }

  get isFilledAllMandatoryData(): boolean {
    const mandatoryFields = [this.number, this.type, this.country];
    return (
      mandatoryFields.some((field) => field == null || field == undefined) ==
      false
    );
  }

  get fieldsWillBeFilled(): String[] {
    const mandatoryFields = [
      { field: this.number, name: "number" },
      { field: this.type, name: "type" },
      { field: this.country, name: "country" },
    ];
    const fieldsEmpty: String[] = [];

    for (const field of mandatoryFields) {
      if (field.field == null || field.field == undefined) {
        fieldsEmpty.push(field.name);
      }
    }

    return fieldsEmpty;
  }
}
