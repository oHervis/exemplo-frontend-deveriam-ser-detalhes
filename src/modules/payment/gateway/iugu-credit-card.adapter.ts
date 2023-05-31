import { PaymentGatewayDto } from "../dto/payment-gateway.dto";
import { CreditCard } from "../entities/credit-card";
import { CreditCardGateway } from "./credit-card-gateway";

export class IuguCreditCardAdapter implements CreditCardGateway {
  async pay(creditCard: CreditCard): Promise<PaymentGatewayDto> {
    // Create the implementation to pay with Iugu
    await this.validateCreditCardData(creditCard);
    return {
      amount: creditCard.amount,
      id: "123",
      status: "paid",
    };
  }

  private async validateCreditCardData(creditCard: CreditCard): Promise<void> {
    if (!creditCard.number) {
      throw new Error("Credit card number is required");
    }
  }
}
