import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderMapper } from 'src/application/mappers/order.mapper';
import { OrderService } from 'src/application/services/order.service';

@Injectable()
export class StartPaymentUseCase {
  constructor(
    private readonly orderService: OrderService,
    @Inject('RMQ_CLIENT') private readonly client: ClientProxy,
  ) {}

  async execute(idempotent_key: string) {
    const paymentData = await this.orderService.findOneToPayment(
      idempotent_key,
    );

    const transformedData = OrderMapper.toPayment(paymentData);

    try {
      await firstValueFrom(
        await this.client.emit('start_payment', transformedData),
      );

      return { message: 'Success' };
    } catch (error) {
      throw new Error('Error occurred when trying to create a new payment');
    }
  }
}
