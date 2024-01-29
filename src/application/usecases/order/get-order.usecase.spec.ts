import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { GetOrderUseCase } from 'src/application/usecases/order/get-order.usecase';

describe('GetOrderUseCase', () => {
  let getOrderUseCase: GetOrderUseCase;
  let orderService: OrderService;

  beforeEach(() => {
    const mockOrderRepository = {} as OrderRepository;
    orderService = new OrderService(mockOrderRepository);
    getOrderUseCase = new GetOrderUseCase(orderService);
  });

  describe('execute', () => {
    it('should get an order by id', async () => {
      const mockOrder = {
        id: 1,
        cpf: 1,
        total: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(orderService, 'findOne').mockResolvedValue(mockOrder);

      const result = await getOrderUseCase.execute(1);
      expect(result).toEqual(mockOrder);
    });
  });
});
