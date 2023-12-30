import { UnimplmentedError } from "../../common/unimplemented_error";
import {
  SuitabilityAnswer,
  SuitabilityAnswerProps,
} from "./suitability_answer";

export type Gender = "M" | "F";

export interface OnboardingProps {
  birthDate?: Date;
  suitabilityAnswer?: SuitabilityAnswerProps;
  hasBrokerConsultant: boolean;
}

export class Onboarding {
  readonly birthDate?: Date;
  readonly suitabilityAnswer?: SuitabilityAnswer;
  readonly hasBrokerConsultant: boolean;

  constructor(props: OnboardingProps) {
    this.birthDate = props.birthDate;
    if (props.suitabilityAnswer)
      this.suitabilityAnswer = new SuitabilityAnswer(props.suitabilityAnswer);
    this.hasBrokerConsultant = props.hasBrokerConsultant;
  }

  get fieldsWillBeFilled(): String[] {
    throw new UnimplmentedError();
  }

  get isFilledAllMandatoryData(): boolean {
    throw new UnimplmentedError();
  }
}
