import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';

@Injectable()
export class GetOrderUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute(idempotent_key: string) {
    return await this.orderService.findOne(idempotent_key);
  }
}
