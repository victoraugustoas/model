import { Entity, EntityProps } from "../../common/entity";
import { Order } from "../../common/order";

export interface SuitabilityQuestionAnswerProps extends EntityProps {
  order: number;
  points: number;
}

export class SuitabilityQuestionAnswer extends Entity<
  SuitabilityQuestionAnswer,
  SuitabilityQuestionAnswerProps
> {
  readonly points: number;
  readonly order: Order;

  constructor(props: SuitabilityQuestionAnswerProps) {
    super(props);
    this.points = props.points;
    this.order = new Order(props.order);
  }
}

export interface SuitabilityAnswerProps {
  answers: SuitabilityQuestionAnswerProps[];
}

export type SuitabilityClassification =
  | "conservative"
  | "moderate"
  | "aggressive";

export class SuitabilityAnswer {
  readonly answers: SuitabilityQuestionAnswer[];

  constructor(props: SuitabilityAnswerProps) {
    this.answers = props.answers.map(
      (answer) => new SuitabilityQuestionAnswer(answer)
    );
  }

  get score(): number {
    let score = 0;
    for (const answer of this.answers) {
      score += answer.points * answer.order.order;
    }
    return score;
  }

  get classification(): SuitabilityClassification {
    const score = this.score;
    if (score < 20) return "conservative";
    if (score > 20 && score <= 50) return "moderate";
    if (score > 50 && score < 100) return "aggressive";
    return "conservative";
  }
}
