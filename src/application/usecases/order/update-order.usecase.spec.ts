import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { UpdateOrderUseCase } from 'src/application/usecases/order/update-order.usecase';

describe('UpdateOrderUseCase', () => {
  let updateOrderUseCase: UpdateOrderUseCase;
  let orderService: OrderService;

  beforeEach(() => {
    const mockOrderRepository = {} as OrderRepository;
    orderService = new OrderService(mockOrderRepository);
    updateOrderUseCase = new UpdateOrderUseCase(orderService);
  });

  describe('execute', () => {
    it('should update an order', async () => {
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

      jest.spyOn(orderService, 'update').mockResolvedValue(mockOrder);

      const result = await updateOrderUseCase.execute(1, mockOrder);
      expect(result).toEqual(mockOrder);
    });
  });
});
