import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { StartPaymentUseCase } from 'src/application/usecases/order/start-payment.usecase';

describe('StartPaymentUseCase', () => {
  let startPaymentUseCase: StartPaymentUseCase;
  let orderService: OrderService;
  let mockedHttpService: HttpService;

  beforeEach(() => {
    const mockOrderRepository = {} as OrderRepository;
    mockedHttpService = new HttpService();
    orderService = new OrderService(mockOrderRepository);
    startPaymentUseCase = new StartPaymentUseCase(
      orderService,
      mockedHttpService,
    );
  });

  describe('execute', () => {
    it('should send order for payment', async () => {
      const mockOrder = {
        id: 1,
        products: [
          {
            id: 1,
          },
        ],
        cpf: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(orderService, 'findOneToPayment').mockResolvedValue(mockOrder);
      jest
        .spyOn(mockedHttpService, 'post')
        .mockImplementationOnce(() => of({} as AxiosResponse));

      const result = await startPaymentUseCase.execute(1);
      expect(result).toEqual({ message: 'Success' });
    });

    it('should throw error if request fails', async () => {
      const mockOrder = {
        id: 1,
        products: [
          {
            id: 1,
          },
        ],
        cpf: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(orderService, 'findOneToPayment').mockResolvedValue(mockOrder);
      jest
        .spyOn(mockedHttpService, 'post')
        .mockImplementationOnce(() =>
          throwError(() => new Error('Random error')),
        );

      const result = startPaymentUseCase.execute(1);
      expect(result).rejects.toThrow(
        'Error occurred when trying to create a new payment',
      );
    });
  });
});
