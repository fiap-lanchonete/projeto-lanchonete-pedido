import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ProductRepository } from 'src/adapters/database/repositories/product.repository';
import { ProductService } from 'src/application/services/product.service';
import { CreateProductUseCase } from 'src/application/usecases/product/create-product.usecase';

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase;
  let mockProductService: ProductService;

  beforeEach(() => {
    const mockProductRepository = {} as ProductRepository;
    mockProductService = new ProductService(mockProductRepository);
    createProductUseCase = new CreateProductUseCase(mockProductService);
  });

  describe('execute', () => {
    it('should create a product', async () => {
      const product = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product',
        amount: 1,
        category_id: 1,
        price: 10.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockProductService, 'create')
        .mockImplementation(() => Promise.resolve(product));

      const createdProduct = await createProductUseCase.execute({
        name: 'Test Product',
        price: 10.0,
      });

      expect(createdProduct).toEqual(product);
    });

    it('should throw an error if product already exists', async () => {
      const product = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product',
        amount: 1,
        category_id: 1,
        price: 10.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(mockProductService, 'create').mockImplementation(() =>
        Promise.reject(
          new PrismaClientKnownRequestError(
            'Unique constraint failed on the fields: (`name`)',
            {
              code: 'P2002',
              clientVersion: '2.20.0',
            },
          ),
        ),
      );

      expect(createProductUseCase.execute(product)).rejects.toThrowError();
    });
  });
});
