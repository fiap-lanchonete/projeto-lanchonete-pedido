import { Injectable, Inject } from '@nestjs/common';
import { Order } from 'src/@types/order';
import { UpdateOrderDTO } from 'src/application/dtos/update-order.dto';
import { IOrder } from 'src/application/interfaces/order.repository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrder,
  ) {}

  async findOne(id: number): Promise<Order.Data | null> {
    return await this.orderRepository.findOne(id);
  }

  async findOneToPayment(id: number): Promise<Order.Data> {
    return await this.orderRepository.findOneToPayment(id);
  }

  async create(order: Partial<Order.Data>): Promise<Order.Data> {
    return await this.orderRepository.create(order);
  }

  async update(
    id: number,
    data: Partial<UpdateOrderDTO>,
  ): Promise<Order.Data | null> {
    await this.orderRepository.update(id, data);

    return this.orderRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.orderRepository.remove(id);
  }
}
