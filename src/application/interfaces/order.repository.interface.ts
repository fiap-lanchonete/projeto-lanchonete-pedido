import { Order } from '@prisma/client';
import { UpdateOrderDTO } from 'src/application/dtos/update-order.dto';
import { Order as PrismaOrder, Product } from '@prisma/client';

export interface IOrder {
  findOne(idempotent_key: string): Promise<Order>;
  findOneToPayment(
    idempotent_key: string,
  ): Promise<PrismaOrder & { products: Product[] }>;
  create(order: Partial<Order>): Promise<Order>;
  update(
    idempotent_key: string,
    pedido: Partial<UpdateOrderDTO>,
  ): Promise<Order>;
  remove(idempotent_key: string): Promise<void>;
}
