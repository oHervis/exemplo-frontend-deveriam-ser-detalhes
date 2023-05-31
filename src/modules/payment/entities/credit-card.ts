import { CreditCardGateway } from "../gateway/credit-card-gateway";

export class CreditCard {
    number: string;
    cvv: string;
    expirationDate: string;
    holder: string;
    brand: string;
    amount: number;
    status: string;

    constructor(
        private readonly creditCardGateway: CreditCardGateway
    ) {
        this.number = '';
        this.cvv = '';
        this.expirationDate = '';
        this.holder = '';
        this.brand = '';
        this.amount = 0;
        this.status = '';
    }

    async pay(): Promise<void> {
        // poderia receber um adapter via Dependecy injection para formatar os dados da forma que o gateway espera
        const { status } = await this.creditCardGateway.pay(this);
        this.status = status;
    }
}
