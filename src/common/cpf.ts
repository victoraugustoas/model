export class CPF {
  readonly cpf: string;

  constructor(cpf: string) {
    if (!CPF.validateCPF(cpf)) throw new Error("invalid_cpf");
    this.cpf = cpf.replace(/\D/, "");
  }

  get formatCpf(): string {
    return this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }

  static validateCPF(cpf: string): boolean {
    const cpfWithoutPunctuation = cpf.replace(/[^\d]+/g, "");
    if (
      cpfWithoutPunctuation.length !== 11 ||
      /^(\d)\1{10}$/.test(cpfWithoutPunctuation)
    ) {
      return false;
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpfWithoutPunctuation.charAt(i)) * (10 - i);
    }
    let rest = sum % 11;
    let digit1 = rest < 2 ? 0 : 11 - rest;
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpfWithoutPunctuation.charAt(i)) * (11 - i);
    }
    rest = sum % 11;
    const digit2 = rest < 2 ? 0 : 11 - rest;
    return (
      digit1 === parseInt(cpfWithoutPunctuation.charAt(9)) &&
      digit2 === parseInt(cpfWithoutPunctuation.charAt(10))
    );
  }
}
