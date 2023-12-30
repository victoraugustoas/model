import { isBefore } from "date-fns";
import { CPF } from "../../common/cpf";
import {
  BrazilDocumentData,
  BrazilDocumentDataProps,
} from "./document_data/brazil_document_data";
import { Gender, Onboarding, OnboardingProps } from "./onboarding";

export interface BrazilOnboardingProps extends OnboardingProps {
  cpf?: string;
  gender?: Gender;
  occupation?: string;
  document?: BrazilDocumentDataProps;
}

export class BrazilOnboarding extends Onboarding {
  readonly cpf?: CPF;
  readonly gender?: Gender;
  readonly occupation?: string;
  readonly document?: BrazilDocumentData;

  constructor(props: BrazilOnboardingProps) {
    super(props);
    this.cpf = new CPF(props.cpf ?? "");
    this.gender = props.gender;
    this.occupation = props.occupation;
    this.document = props.document
      ? new BrazilDocumentData(props.document)
      : undefined;

    if (
      this.birthDate &&
      props.document?.issuingDate &&
      isBefore(props.document?.issuingDate, this.birthDate)
    ) {
      throw new Error("issuing_date_is_before_birthdate");
    }
  }
}
