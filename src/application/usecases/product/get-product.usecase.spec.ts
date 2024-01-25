import { ProductRepository } from 'src/adapters/database/repositories/product.repository';
import { ProductService } from 'src/application/services/product.service';
import { GetProductUseCase } from 'src/application/usecases/product/get-product.usecase';

describe('GetProductUseCase', () => {
  let getProductUseCase: GetProductUseCase;
  let mockProductService: ProductService;

  beforeEach(() => {
    const mockProductRepository = {} as ProductRepository;
    mockProductService = new ProductService(mockProductRepository);
    getProductUseCase = new GetProductUseCase(mockProductService);
  });

  describe('execute', () => {
    it('should get a product by id ', async () => {
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
        .spyOn(mockProductService, 'findOne')
        .mockImplementation(() => Promise.resolve(product));

      const result = await getProductUseCase.execute(1);

      expect(result).toEqual(product);
    });
  });
});
