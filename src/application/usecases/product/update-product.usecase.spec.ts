import { ProductRepository } from 'src/adapters/database/repositories/product.repository';
import { ProductService } from 'src/application/services/product.service';
import { UpdateProductsUseCase } from 'src/application/usecases/product/update-product.usecase';

describe('UpdateProductUseCase', () => {
  let updateProductUseCase: UpdateProductsUseCase;
  let mockProductService: ProductService;

  beforeEach(() => {
    const mockProductRepository = {} as ProductRepository;
    mockProductService = new ProductService(mockProductRepository);
    updateProductUseCase = new UpdateProductsUseCase(mockProductService);
  });

  describe('execute', () => {
    it('should update a product', async () => {
      const product = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product',
        amount: 1,
        category_id: 1,
        price: '10.0',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockProductService, 'update')
        .mockImplementation(() => Promise.resolve(product));

      const result = await updateProductUseCase.execute({
        id: 1,
        data: {
          name: 'test',
        },
      });

      expect(result).toEqual(product);
    });
  });
});
