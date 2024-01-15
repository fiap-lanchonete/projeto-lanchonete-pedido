import { OrderService } from 'src/application/services/order.service';

export class GetOrderUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute(id: number) {
    return await this.orderService.findOne(id);
  }
}
