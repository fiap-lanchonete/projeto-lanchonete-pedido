import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let mockOrderRepository: OrderRepository;
  let mockPrismaHelper: PrismaHelper;

  beforeEach(() => {
    mockPrismaHelper = {} as PrismaHelper;
    mockOrderRepository = new OrderRepository(mockPrismaHelper);
    orderService = new OrderService(mockOrderRepository);
  });

  describe('findOne', () => {
    it('should return an order', async () => {
      const order = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        idempotent_key: '1234567890',
        total: 10,
        cpf: '12345678901',
        products: [
          {
            id: 1,
            name: 'Test Product',
            description: 'This is a test product',
            amount: 1,
            category_id: 1,
            price: 10.0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockOrderRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(order));

      const result = await orderService.findOne('1');

      expect(result).toBeDefined();
      expect(result).toEqual(order);
    });
  });

  describe('findOneToPayment', () => {
    it('should return an order', async () => {
      const order = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        idempotent_key: '1234567890',
        total: 10,
        cpf: '12345678901',
        products: [
          {
            id: 1,
            name: 'Test Product',
            description: 'This is a test product',
            amount: 1,
            category_id: 1,
            price: 10.0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockOrderRepository, 'findOneToPayment')
        .mockImplementation(() => Promise.resolve(order));

      const result = await orderService.findOneToPayment('1');

      expect(result).toBeDefined();
      expect(result).toEqual(order);
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      const order = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        idempotent_key: '1234567890',
        total: 10,
        cpf: '12345678901',
        products: [
          {
            id: 1,
            name: 'Test Product',
            description: 'This is a test product',
            amount: 1,
            category_id: 1,
            price: 10.0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockOrderRepository, 'create')
        .mockImplementation(() => Promise.resolve(order));

      const result = await orderService.create(order);

      expect(result).toBeDefined();
      expect(result).toEqual(order);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const order = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        idempotent_key: '1234567890',
        total: 10,
        cpf: '12345678901',
        products: [
          {
            id: 1,
            name: 'Test Product',
            description: 'This is a test product',
            amount: 1,
            category_id: 1,
            price: 10.0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockOrderRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(order));

      jest
        .spyOn(mockOrderRepository, 'update')
        .mockImplementation(() => Promise.resolve(order));

      const result = await orderService.update(order.idempotent_key, order);

      expect(result).toBeDefined();
      expect(result).toEqual(order);
    });
  });

  describe('delete', () => {
    it('should delete an order', async () => {
      const order = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        idempotent_key: '1234567890',
        total: 10,
        cpf: '12345678901',
        products: [
          {
            id: 1,
            name: 'Test Product',
            description: 'This is a test product',
            amount: 1,
            category_id: 1,
            price: 10.0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockOrderRepository, 'remove')
        .mockImplementation(() => Promise.resolve());

      const result = await orderService.delete(order.idempotent_key);

      expect(result).toBeUndefined();
    });
  });
});
