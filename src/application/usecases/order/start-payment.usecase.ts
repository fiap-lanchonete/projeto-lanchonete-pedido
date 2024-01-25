import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { OrderService } from 'src/application/services/order.service';

@Injectable()
export class StartPaymentUseCase {
  constructor(
    private readonly orderService: OrderService,
    private readonly httpService: HttpService,
  ) {}

  async execute(id: number) {
    const response = await this.orderService.findOneToPayment(id);

    try {
      await firstValueFrom(
        this.httpService.post(process.env.PAYMENT_SERVICE_URL, response),
      );

      return { message: 'Success' };
    } catch (error) {
      throw new Error('Error occurred when trying to create a new payment');
    }
  }
}
