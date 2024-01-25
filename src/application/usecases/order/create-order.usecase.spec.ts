import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { CreateOrderUseCase } from 'src/application/usecases/order/create-order.usecase';

describe('CreateOrderUseCase', () => {
  let createOrderUseCase: CreateOrderUseCase;
  let orderService: OrderService;

  beforeEach(() => {
    const mockOrderRepository = {} as OrderRepository;
    orderService = new OrderService(mockOrderRepository);
    createOrderUseCase = new CreateOrderUseCase(orderService);
  });

  describe('execute', () => {
    it('should create a new order', async () => {
      const mockOrder = {
        id: 1,
        user_id: 1,
        total: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(orderService, 'create').mockResolvedValue(mockOrder);

      const result = await createOrderUseCase.execute(mockOrder);
      expect(result).toEqual(mockOrder);
    });
  });
});
