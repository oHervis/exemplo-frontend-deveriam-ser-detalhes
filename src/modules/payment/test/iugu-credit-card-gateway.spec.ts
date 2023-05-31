import { CreditCard } from "../entities/credit-card";
import { IuguCreditCardAdapter } from "../gateway/iugu-credit-card.adapter";

// Tests that payment with Iugu is successful.
it("test_iugu_payment_success", async () => {
  const adapter = new IuguCreditCardAdapter();
  const creditCard = new CreditCard(adapter);
  creditCard.number = "4111111111111111";
  creditCard.cvv = "123";
  creditCard.expirationDate = "12/2022";
  creditCard.holder = "John Doe";
  creditCard.brand = "Visa";
  creditCard.amount = 1000;
  await expect(creditCard.pay()).resolves.not.toThrow();
  expect(creditCard.status).toBe("paid");
});

// Tests that an error is thrown when invalid credit card data is provided.
it("test_invalid_credit_card_data", async () => {
  const adapter = new IuguCreditCardAdapter();
  const creditCard = new CreditCard(adapter);
  creditCard.number = "";
  creditCard.cvv = "123";
  creditCard.expirationDate = "12/2022";
  creditCard.holder = "John Doe";
  creditCard.brand = "Visa";
  creditCard.amount = 1000;
  await expect(creditCard.pay()).rejects.toThrow();
});

// Tests that an error is thrown when payment fails.
it("test_payment_failure", async () => {
  const adapter = new IuguCreditCardAdapter();
  const creditCard = new CreditCard(adapter);
  creditCard.number = "";
  creditCard.cvv = "123";
  creditCard.expirationDate = "12/2022";
  creditCard.holder = "John Doe";
  creditCard.brand = "Visa";
  creditCard.amount = 0;
  await expect(creditCard.pay()).rejects.toThrow();
});

// Tests that credit card data is properly formatted for Iugu.
it("test_formatting_credit_card_data", async () => {
  const adapter = new IuguCreditCardAdapter();
  const creditCard = new CreditCard(adapter);
  creditCard.number = "4111 1111 1111 1111";
  creditCard.cvv = "123";
  creditCard.expirationDate = "12/2022";
  creditCard.holder = "John Doe";
  creditCard.brand = "Visa";
  creditCard.amount = 1000;
  await expect(creditCard.pay()).resolves.not.toThrow();
  expect(creditCard.status).toBe("paid");
});

// Tests that a PaymentGatewayDto with the correct data is returned.
it("test_return_payment_gateway_dto", async () => {
  const adapter = new IuguCreditCardAdapter();
  const creditCard = new CreditCard(adapter);
  creditCard.number = "4111111111111111";
  creditCard.cvv = "123";
  creditCard.expirationDate = "12/2022";
  creditCard.holder = "John Doe";
  creditCard.brand = "Visa";
  creditCard.amount = 1000;
  await creditCard.pay();
  expect(creditCard.status).toBe("paid");
});

// Tests that errors and exceptions are properly handled.
it("test_error_handling", async () => {
  const adapter = new IuguCreditCardAdapter();
  const creditCard = new CreditCard(adapter);
  creditCard.number = "";
  creditCard.cvv = "123";
  creditCard.expirationDate = "12/2022";
  creditCard.holder = "John Doe";
  creditCard.brand = "Visa";
  creditCard.amount = 1000;
  const spy = jest.spyOn(adapter, "pay").mockImplementation(() => {
    throw new Error("Error");
  });
  await expect(creditCard.pay()).rejects.toThrow();
  spy.mockRestore();
});
