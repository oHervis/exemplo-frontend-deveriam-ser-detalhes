import { PaymentGatewayDto } from "../dto/payment-gateway.dto";
import { CreditCard } from "../entities/credit-card";

export interface CreditCardGateway {
    pay(creditCard: CreditCard): Promise<PaymentGatewayDto>
}