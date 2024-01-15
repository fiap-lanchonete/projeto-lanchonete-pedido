import { Injectable } from '@nestjs/common';
import { Order } from 'src/@types/order';
import { OrderService } from 'src/application/services/order.service';

@Injectable()
export class UpdateOrderUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute(id: number, data: Partial<Order.Data>) {
    return await this.orderService.update(id, data);
  }
}
