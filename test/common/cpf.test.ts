import { CPF } from "../../src/common/cpf";

test("verify if valid cpf", () => {
  const cpfs = [
    { cpf: "271.459.810-25", result: true },
    { cpf: "96628653064", result: true },
    { cpf: "123456789", result: false },
    { cpf: "174.042.600-27", result: true },
    { cpf: "83685895095", result: true },
    { cpf: "02039092243", result: false },
    { cpf: "", result: false },
  ];
  for (let cpfTest of cpfs) {
    expect(CPF.validateCPF(cpfTest.cpf)).toBe(cpfTest.result);
  }
});

test("should instatiate a cpf", () => {
  const cpfNumber = "87729525046";
  const cpf = new CPF(cpfNumber);
  expect(cpf.cpf).toBe(cpfNumber);
});

test("should throw error to invalid cpf", () => {
  const cpfNumber = "123456789";
  expect(() => new CPF(cpfNumber)).toThrow(new Error("invalid_cpf"));
});

test("should format cpf correctly", () => {
  const cpfNumber = "87729525046";
  const cpf = new CPF(cpfNumber);
  expect(cpf.formatCpf).toBe("877.295.250-46");
});
