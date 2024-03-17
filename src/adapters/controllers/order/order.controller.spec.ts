import { ClientProxy } from '@nestjs/microservices';
import { OrderController } from 'src/adapters/controllers/order/order.controller';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { CreateOrderUseCase } from 'src/application/usecases/order/create-order.usecase';
import { GetOrderUseCase } from 'src/application/usecases/order/get-order.usecase';
import { StartPaymentUseCase } from 'src/application/usecases/order/start-payment.usecase';
import { UpdateOrderUseCase } from 'src/application/usecases/order/update-order.usecase';

describe('OrderController', () => {
  let orderController: OrderController;
  let createOrderUseCase: CreateOrderUseCase;
  let getOrderUseCase: GetOrderUseCase;
  let updateOrderUseCase: UpdateOrderUseCase;
  let startPaymentUseCase: StartPaymentUseCase;
  let mockOrderService: OrderService;

  beforeEach(() => {
    const mockOrderRepository = {} as OrderRepository;
    mockOrderService = new OrderService(mockOrderRepository);
    createOrderUseCase = new CreateOrderUseCase(mockOrderService);
    getOrderUseCase = new GetOrderUseCase(mockOrderService);
    updateOrderUseCase = new UpdateOrderUseCase(mockOrderService);
    const mockClientProxy: Partial<ClientProxy> = {
      send: jest.fn().mockImplementation((pattern, data) => {
        return Promise.resolve({ message: 'Success' });
      }),
    };
    startPaymentUseCase = new StartPaymentUseCase(
      mockOrderService,
      mockClientProxy as ClientProxy,
    );

    orderController = new OrderController(
      createOrderUseCase,
      getOrderUseCase,
      updateOrderUseCase,
      startPaymentUseCase,
    );
  });

  describe('getOrder', () => {
    it('should get an order by id', async () => {
      const mockOrder = {
        id: 1,
        name: 'Order 1',
        price: 10,
        amount: 1,
        description: 'Description 1',
        category_id: 1,
        cpf: '12345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(getOrderUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(mockOrder));

      expect(await orderController.getOrder('1')).toEqual(mockOrder);
    });
  });

  describe('updateProductsOrder', () => {
    it('should update an order by id', async () => {
      const mockOrder = {
        id: 1,
        name: 'Order 1',
        price: 10,
        amount: 1,
        description: 'Description 1',
        category_id: 1,
        cpf: '12345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(updateOrderUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(mockOrder));

      expect(
        await orderController.updateProductsOrder('1', {
          products: [
            {
              id: 1,
            },
          ],
        }),
      ).toEqual(mockOrder);
    });
  });

  describe('startPayment', () => {
    it('should start payment process', async () => {
      const mockResponse = { message: 'Success' };

      jest
        .spyOn(startPaymentUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(mockResponse));

      expect(await orderController.startPayment('1')).toEqual(mockResponse);
    });
  });
});
