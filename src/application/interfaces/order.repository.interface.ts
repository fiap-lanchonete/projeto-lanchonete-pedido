import { Order } from '@prisma/client';

export interface IOrder {
  findOne(id: number): Promise<Order>;
  findOneToPayment(id: number): Promise<Order>;
  create(order: Partial<Order>): Promise<Order>;
  update(id: number, pedido: Partial<Order>): Promise<Order>;
  remove(id: number): Promise<void>;
}
