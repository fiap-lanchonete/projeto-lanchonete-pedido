import { Injectable } from '@nestjs/common';
import { UpdateOrderDTO } from 'src/application/dtos/update-order.dto';
import { OrderService } from 'src/application/services/order.service';

@Injectable()
export class UpdateOrderUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute(id: number, data: Partial<UpdateOrderDTO>) {
    return await this.orderService.update(id, data);
  }
}
