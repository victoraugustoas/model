export class TIN {
  readonly tin: string;

  constructor(tin: string) {
    if (tin.trim().length == 0) throw new Error("invalid_tin_number");
    this.tin = tin;
  }
}
