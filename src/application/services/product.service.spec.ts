import { Decimal } from '@prisma/client/runtime/library';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { ProductRepository } from 'src/adapters/database/repositories/product.repository';
import { ProductService } from 'src/application/services/product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let mockProductRepository: ProductRepository;
  let mockPrismaHelper: PrismaHelper;

  beforeEach(() => {
    mockPrismaHelper = {} as PrismaHelper;
    mockProductRepository = new ProductRepository(mockPrismaHelper);
    productService = new ProductService(mockProductRepository);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [
        {
          id: 1,
          name: 'Test Product',
          description: 'This is a test product',
          amount: 1,
          category_id: 1,
          price: new Decimal('10.0'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Test Product 2',
          description: 'This is a test product 2',
          amount: 1,
          category_id: 2,
          price: new Decimal('10.0'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(mockProductRepository, 'findAll')
        .mockImplementation(() => Promise.resolve(products));

      const result = await productService.findAll();

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
    });

    it('should return an empty array if no products are found', async () => {
      jest
        .spyOn(mockProductRepository, 'findAll')
        .mockImplementation(() => Promise.resolve([]));

      const products = await productService.findAll();

      expect(products).toBeDefined();
      expect(products).toBeInstanceOf(Array);
      expect(products).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      const product = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product',
        amount: 1,
        category_id: 1,
        price: new Decimal('10.0'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockProductRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(product));

      const result = await productService.findOne(1);

      expect(result).toBeDefined();
      expect(result).toEqual(product);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const product = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product',
        amount: 1,
        category_id: 1,
        price: new Decimal('10.0'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockProductRepository, 'create')
        .mockImplementation(() => Promise.resolve(product));

      const result = await productService.create({
        name: 'Test Product',
      });

      expect(result).toBeDefined();
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const category = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product',
        amount: 1,
        category_id: 1,
        price: new Decimal('10.0'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockProductRepository, 'update')
        .mockImplementation(() => Promise.resolve(category));

      jest
        .spyOn(mockProductRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(category));

      const result = await productService.update(1, {
        name: 'Updated Product',
      });

      expect(result).toBeDefined();
      expect(result).toEqual(category);
    });
  });

  describe('delete', () => {
    it('should delete an existing product', async () => {
      jest
        .spyOn(mockProductRepository, 'remove')
        .mockImplementation(() => Promise.resolve());

      await productService.delete(1);

      expect(mockProductRepository.remove).toHaveBeenCalledTimes(1);
      expect(mockProductRepository.remove).toHaveBeenCalledWith(1);
    });
  });
});
