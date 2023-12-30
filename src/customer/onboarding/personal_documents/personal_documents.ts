import { PersonalDocument, PersonalDocumentProps } from "./personal_document";
import { PersonalDocumentRule, PersonalDocumentRuleProps } from "./rules";

export interface PersonalDocumentsProps {
  rules?: PersonalDocumentRuleProps[];
  documents?: PersonalDocumentProps[];
}

export class PersonalDocuments {
  readonly rules: PersonalDocumentRule[];
  documents: PersonalDocument[];

  constructor(props: PersonalDocumentsProps) {
    if (!props.rules) throw new Error("rules_not_defined");
    this.rules = props.rules.map((props) => new PersonalDocumentRule(props));

    this.documents = props.documents
      ? props.documents.map((doc) => new PersonalDocument(doc))
      : [];
  }

  submitDocument(document: PersonalDocument) {
    this.documents.push(document);
  }

  get isSubmitedAllDocuments(): boolean {
    const skip = [];

    for (let i = 0; i < this.rules.length; i++) {
      const rule = this.rules[i];
      const docs = this.documents.filter((doc) => doc.type == rule.type);
      skip.push(rule.typeToDisconsider);

      if (skip.includes(rule.type)) continue;
      if (docs.length == 0) return false;

      for (const side of rule.sidesToSubmit) {
        const doc = docs.find((doc) => doc.side == side);
        if (!doc) return false;
      }
    }
    return true;
  }
}
