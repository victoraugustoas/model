import { CustomerDocumentType } from "../document_data/document_data";
import { DocumentSide } from "./personal_document";

export type PersonalDocumentType = CustomerDocumentType | "PROOF_OF_ADDRESS";

export interface PersonalDocumentRuleProps {
  type: PersonalDocumentType;
  sidesToSubmit: DocumentSide[];
  typeToDisconsider?: PersonalDocumentType;
}

export class PersonalDocumentRule {
  readonly type: PersonalDocumentType;
  readonly sidesToSubmit: DocumentSide[];
  readonly typeToDisconsider?: PersonalDocumentType;

  constructor(props: PersonalDocumentRuleProps) {
    this.type = props.type;
    this.sidesToSubmit = props.sidesToSubmit;
    this.typeToDisconsider = props.typeToDisconsider;
  }
}
