import { Currency } from "../../src/currency/currency";

test("should create a new currency", () => {
  const currency = new Currency({ name: "dollar", code: "USD", symbol: "$" });
  expect(currency.name).toBe("dollar");
  expect(currency.code).toBe("USD");
  expect(currency.symbol).toBe("$");
});

test("should throw error for symbol with more 2 characters", () => {
  expect(
    () => new Currency({ name: "dollar", code: "USD", symbol: "R$%" })
  ).toThrow(new Error("currency_symbol_length_more_than_two_characters"));
});

test("should throw error for code with different length", () => {
  expect(
    () => new Currency({ name: "dollar", code: "USDT", symbol: "$" })
  ).toThrow(new Error("invalid_currency_code_length"));
});
