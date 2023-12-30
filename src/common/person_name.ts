import { SimpleName } from "./simple_name";

export class PersonName extends SimpleName {
  constructor(name: string) {
    super(name, 5, 200);
    const splitedNames = name.trim().split(" ");
    if (splitedNames.length < 2) throw new Error("name_must_contain_surname");
  }
}
