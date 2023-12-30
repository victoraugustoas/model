import { UrlLink } from "../../../common/url_link";
import { CustomerDocumentType } from "../document_data/document_data";
import { PersonalDocumentType } from "./rules";

export interface PersonalDocumentProps {
  url: string;
  type: PersonalDocumentType;
  side: DocumentSide;
}

export type DocumentSide = "FRONT" | "BACK";

export class PersonalDocument {
  readonly url: UrlLink;
  readonly type: PersonalDocumentType;
  readonly side: DocumentSide;

  constructor(props: PersonalDocumentProps) {
    this.url = new UrlLink(props.url);
    this.type = props.type;
    this.side = props.side;
  }
}
