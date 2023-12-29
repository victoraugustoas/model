export class HundredPercentage {
  readonly percentage: number;

  constructor(percentage: number) {
    if (percentage > 1 || percentage < 0)
      throw new Error("invalid_percentage_value");
    this.percentage = percentage;
  }
}

export class Percentage {
  readonly percentage: number;

  constructor(percentage: number) {
    this.percentage = percentage;
  }
}
