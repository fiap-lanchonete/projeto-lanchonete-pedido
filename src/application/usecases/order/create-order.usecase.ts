import { Injectable } from '@nestjs/common';
import { Order } from 'src/@types/order';
import { OrderService } from 'src/application/services/order.service';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute(data: Partial<Order.Data>) {
    return await this.orderService.create(data);
  }
}
