<script setup lang="ts">
import { reactive } from "vue";

import { CreditCard } from "./entities/credit-card";
import { CreditCardGateway } from "./gateway/credit-card-gateway";
import { IuguCreditCardAdapter } from "./gateway/iugu-credit-card.adapter";

const paymentService: CreditCardGateway = new IuguCreditCardAdapter();
const paymentForm = reactive<CreditCard>(new CreditCard(paymentService));
</script>

<template>
  <div class="card">
    <p>Checkout</p>
    <section>
      <form>
        <label for="number">
          <input
            v-model="paymentForm.number"
            type="text"
            placeholder="Número"
            label="Número"
          />
        </label>
        <label for="cvv">
          <input
            v-model="paymentForm.cvv"
            type="text"
            placeholder="Cvv"
            label="CVV"
          />
        </label>
        <label for="expirationDate">
          <input
            v-model="paymentForm.expirationDate"
            type="text"
            placeholder="Data"
            label="Data de validade"
          />
        </label>
        <label for="holder">
          <input
            v-model="paymentForm.holder"
            type="text"
            placeholder="Nome no cartão"
            label="Nome no cartão"
          />
        </label>
        <label for="amount">
          <input
            v-model="paymentForm.amount"
            type="text"
            placeholder="Quantia"
            label="Quantia"
          />
        </label>
      </form>
    </section>
    <button type="button" @click="paymentForm.pay()">Efeturar Pagamento</button>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
label {
  margin: 10px;
  width: 100%;
}
input {
  padding: 10px;
}
.read-the-docs {
  color: #888;
}
</style>
