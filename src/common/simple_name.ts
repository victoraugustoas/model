export class SimpleName {
  private readonly name: string;

  constructor(name: string, min: number, max: number) {
    const splitedNames = name.trim().split(" ");
    if (splitedNames.length < 2) throw new Error("name_must_contain_surname");

    const nameLenght = splitedNames.reduce((lenght, name) => {
      return lenght + name.length;
    }, 0);
    if (nameLenght < min) throw new Error("minimum_characters_not_reached");
    if (nameLenght > max) throw new Error("maximum_characters_not_allowed");

    this.name = splitedNames.join(" ");
  }

  get fullName() {
    return this.name;
  }
}
