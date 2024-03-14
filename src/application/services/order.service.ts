import { Injectable, Inject } from '@nestjs/common';
import { Order } from 'src/@types/order';
import { Order as PrismaOrder, Product } from '@prisma/client';
import { UpdateOrderDTO } from 'src/application/dtos/update-order.dto';
import { IOrder } from 'src/application/interfaces/order.repository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrder,
  ) {}

  async findOne(idempotent_key: string): Promise<Order.Data | null> {
    return await this.orderRepository.findOne(idempotent_key);
  }

  async findOneToPayment(
    idempotent_key: string,
  ): Promise<PrismaOrder & { products: Product[] }> {
    return await this.orderRepository.findOneToPayment(idempotent_key);
  }

  async create(order: Partial<Order.Data>): Promise<Order.Data> {
    return await this.orderRepository.create(order);
  }

  async update(
    idempotent_key: string,
    data: Partial<UpdateOrderDTO>,
  ): Promise<Order.Data | null> {
    await this.orderRepository.update(idempotent_key, data);

    return this.orderRepository.findOne(idempotent_key);
  }

  async delete(idempotent_key: string): Promise<void> {
    await this.orderRepository.remove(idempotent_key);
  }
}
