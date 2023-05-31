import { CreditCard } from "../entities/credit-card";
import { CreditCardGateway } from "../gateway/credit-card-gateway";

// Tests that payment is successful and status is updated.
it("test_successful_payment", async () => {
  const mockGateway: CreditCardGateway = {
    pay: jest.fn().mockResolvedValue({ status: "paid" }),
  };
  const creditCard = new CreditCard(mockGateway);
  await creditCard.pay();
  expect(creditCard.status).toBe("paid");
});

// Tests that an error is thrown when an invalid credit card number is provided.
it("test_invalid_credit_card_number", async () => {
  const mockGateway: CreditCardGateway = {
    pay: jest.fn().mockRejectedValue(new Error("Invalid credit card number")),
  };
  const creditCard = new CreditCard(mockGateway);
  await expect(creditCard.pay()).rejects.toThrow("Invalid credit card number");
});

// Tests that an error is thrown when an invalid CVV is provided.
it("test_invalid_cvv", async () => {
  const mockGateway: CreditCardGateway = {
    pay: jest.fn().mockRejectedValue(new Error("Invalid CVV")),
  };
  const creditCard = new CreditCard(mockGateway);
  await expect(creditCard.pay()).rejects.toThrow("Invalid CVV");
});

// Tests that an error is thrown when an expired credit card is provided.
it("test_expired_credit_card", async () => {
  const mockGateway: CreditCardGateway = {
    pay: jest.fn().mockRejectedValue(new Error("Expired credit card")),
  };
  const creditCard = new CreditCard(mockGateway);
  await expect(creditCard.pay()).rejects.toThrow("Expired credit card");
});

// Tests that an error is thrown when there are insufficient funds to complete the payment.
it("test_insufficient_funds", async () => {
  const mockGateway: CreditCardGateway = {
    pay: jest.fn().mockRejectedValue(new Error("Insufficient funds")),
  };
  const creditCard = new CreditCard(mockGateway);
  await expect(creditCard.pay()).rejects.toThrow("Insufficient funds");
});

// Tests that errors thrown by the gateway are handled properly.
it("test_gateway_error_handling", async () => {
  const mockGateway: CreditCardGateway = {
    pay: jest.fn().mockRejectedValue(new Error("Gateway error")),
  };
  const creditCard = new CreditCard(mockGateway);
  await expect(creditCard.pay()).rejects.toThrow("Gateway error");
});
