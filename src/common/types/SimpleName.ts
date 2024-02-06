import { Result } from "../base/Result";
import { VO } from "../base/ValueObject";

export class SimpleName extends VO<string> {
  private constructor(name: string) {
    super(name);
  }

  static new(name: string, min: number, max: number): Result<SimpleName> {
    const nameLenght = name.length;
    const lessThan = nameLenght < min ? "minimum_characters_not_reached" : null;
    const biggerThan =
      nameLenght > max ? "maximum_characters_not_allowed" : null;

    const error = lessThan || biggerThan;

    return error
      ? Result.fail({ tipo: error, valor: name })
      : Result.ok(new SimpleName(name));
  }
}
