import { Order, Product } from '@prisma/client';
import { CreatePaymentDTO } from 'src/application/dtos/create-payment.dto';

export class OrderMapper {
  static toPayment(order: Order & { products: Product[] }): CreatePaymentDTO {
    return {
      payerFirstName: order.name,
      payerLastName: '',
      email: order.email,
      idempotent_key: order.idempotent_key,
      identificationType: 'CPF',
      identificationNumber: Number(order.cpf),
      items: order.products.map((product) => ({
        product: product.name,
        quantity: product.amount,
        price: product.price,
      })),
    };
  }
}
