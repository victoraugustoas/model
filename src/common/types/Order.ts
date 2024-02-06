import { Result } from "../base/Result";
import { VO } from "../base/ValueObject";

export class Order extends VO<number> {
  private constructor(order: number) {
    super(order);
  }

  static new(order: number): Result<Order> {
    if (order < 0) return Result.fail("invalid_negative_order");
    return Result.ok(new Order(order));
  }
}
