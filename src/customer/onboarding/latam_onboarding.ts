import { TIN } from "../../common/tin";
import {
  LatamDocumentData,
  LatamDocumentDataProps,
} from "./document_data/latam_document_data";
import { Onboarding, OnboardingProps } from "./onboarding";
import {
  PersonalDocuments,
  PersonalDocumentsProps,
} from "./personal_documents/personal_documents";

export interface LatamOnboardingProps extends OnboardingProps {
  tin?: string;
  document?: LatamDocumentDataProps;
  personalDocuments?: PersonalDocumentsProps;
}

export class LatamOnboarding extends Onboarding {
  readonly tin?: TIN;
  readonly document?: LatamDocumentData;
  readonly personalDocuments?: PersonalDocuments;

  constructor(props: LatamOnboardingProps) {
    super(props);
    if (props.tin) this.tin = new TIN(props.tin);
    if (props.document) this.document = new LatamDocumentData(props.document);

    this.personalDocuments = new PersonalDocuments({
      ...props.personalDocuments,
      rules: [
        {
          sidesToSubmit: ["FRONT", "BACK"],
          type: "RG",
          typeToDisconsider: "CNH",
        },
        { sidesToSubmit: ["FRONT"], type: "CNH", typeToDisconsider: "RG" },
        {
          sidesToSubmit: ["FRONT"],
          type: "PROOF_OF_ADDRESS",
        },
      ],
    });
  }

  get isFilledAllMandatoryData(): boolean {
    const mandatoryFields = [
      this.birthDate,
      this.tin,
      this.document?.isFilledAllMandatoryData,
      this.suitabilityAnswer,
      this.personalDocuments?.isSubmitedAllDocuments,
    ];

    return (
      mandatoryFields.some(
        (field) => field == null || field == undefined || field == false
      ) == false
    );
  }

  get fieldsWillBeFilled(): String[] {
    const mandatoryFields = [
      { field: this.birthDate, name: "birthDate" },
      { field: this.tin, name: "tin" },
      { field: this.document?.fieldsWillBeFilled, name: "document" },
      { field: this.suitabilityAnswer, name: "suitability" },
      {
        field: this.personalDocuments?.isSubmitedAllDocuments,
        name: "personalDocuments",
      },
    ];
    const fieldsEmpty: String[] = [];

    for (const field of mandatoryFields) {
      if (
        field.field == null ||
        field.field == undefined ||
        field.field == false ||
        Array.isArray(field.field)
      ) {
        if (Array.isArray(field.field)) {
          field.field.forEach((f) => fieldsEmpty.push(`${field.name}.${f}`));
        } else {
          fieldsEmpty.push(field.name);
        }
      }
    }

    return fieldsEmpty;
  }
}
