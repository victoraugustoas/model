export class Order {
  readonly order: number;

  constructor(order: number) {
    if (order < 0) throw new Error("invalid_negative_order");
    this.order = order;
  }
}
