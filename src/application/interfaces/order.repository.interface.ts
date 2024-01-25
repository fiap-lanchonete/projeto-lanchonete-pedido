import { Order } from '@prisma/client';
import { UpdateOrderDTO } from 'src/application/dtos/update-order.dto';

export interface IOrder {
  findOne(id: number): Promise<Order>;
  findOneToPayment(id: number): Promise<Order>;
  create(order: Partial<Order>): Promise<Order>;
  update(id: number, pedido: Partial<UpdateOrderDTO>): Promise<Order>;
  remove(id: number): Promise<void>;
}
