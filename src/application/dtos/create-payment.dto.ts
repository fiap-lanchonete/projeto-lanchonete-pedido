interface Item {
  product: string;
  quantity: number;
  price: number;
}

export interface CreatePaymentDTO {
  payerFirstName: string;
  payerLastName: string;
  email: string;
  idempotent_key: string;
  identificationType: string;
  identificationNumber: number;
  items: Item[];
}
