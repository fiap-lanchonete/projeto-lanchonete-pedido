import { ClientProxy } from '@nestjs/microservices';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { StartPaymentUseCase } from 'src/application/usecases/order/start-payment.usecase';

describe('StartPaymentUseCase', () => {
  let startPaymentUseCase: StartPaymentUseCase;
  let orderService: OrderService;
  const mockClientProxy: Partial<ClientProxy> = {
    emit: jest.fn().mockImplementation((pattern, data) => {
      return Promise.resolve({ message: 'Success' });
    }),
  };

  beforeEach(() => {
    const mockOrderRepository = {} as OrderRepository;
    orderService = new OrderService(mockOrderRepository);
    startPaymentUseCase = new StartPaymentUseCase(
      orderService,
      mockClientProxy as ClientProxy,
    );
  });

  describe('execute', () => {
    it('should send order for payment', async () => {
      const mockOrder = {
        id: 1,
        products: [
          {
            id: 1,
            name: 'Product Name',
            price: 22,
            description: 'Product Description',
            amount: 1,
            category_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        idempotent_key: 'abea-a2asf-123',
        total: 22,
        cpf: '12345678909',
        name: 'John Doe',
        email: 'johndoe@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(orderService, 'findOneToPayment').mockResolvedValue(mockOrder);
      jest
        .spyOn(mockClientProxy, 'emit')
        .mockImplementationOnce(() => of({} as AxiosResponse));

      const result = await startPaymentUseCase.execute('1');
      expect(result).toEqual({ message: 'Success' });
    });

    it('should throw error if request fails', async () => {
      const mockOrder = {
        id: 1,
        total: 22,
        products: [
          {
            id: 1,
            name: 'Product Name',
            price: 22,
            description: 'Product Description',
            amount: 1,
            category_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        idempotent_key: 'abea-a2asf-123',
        cpf: '12345678909',
        name: 'John Doe',
        email: 'johndoe@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(orderService, 'findOneToPayment').mockResolvedValue(mockOrder);
      jest
        .spyOn(mockClientProxy, 'emit')
        .mockImplementationOnce(() =>
          throwError(() => new Error('Random error')),
        );

      const result = startPaymentUseCase.execute('1');
      expect(result).rejects.toThrow(
        'Error occurred when trying to create a new payment',
      );
    });
  });
});
