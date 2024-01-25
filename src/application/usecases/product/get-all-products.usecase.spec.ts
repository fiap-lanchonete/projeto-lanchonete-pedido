import { ProductRepository } from 'src/adapters/database/repositories/product.repository';
import { ProductService } from 'src/application/services/product.service';
import { GetAllProductsUseCase } from 'src/application/usecases/product/get-all-products.usecase';

describe('GetAllProductsUseCase', () => {
  let getAllProductsUseCase: GetAllProductsUseCase;
  let mockProductService: ProductService;

  beforeEach(() => {
    const mockProductRepository = {} as ProductRepository;
    mockProductService = new ProductService(mockProductRepository);
    getAllProductsUseCase = new GetAllProductsUseCase(mockProductService);
  });

  describe('execute', () => {
    it('should get all products', async () => {
      const products = [
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
        {
          id: 2,
          name: 'Test Product 2',
          description: 'This is a test product 2',
          amount: 1,
          category_id: 2,
          price: 10.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(mockProductService, 'findAll')
        .mockImplementation(() => Promise.resolve(products));

      const result = await getAllProductsUseCase.execute();

      expect(result).toEqual(products);
    });
  });
});
