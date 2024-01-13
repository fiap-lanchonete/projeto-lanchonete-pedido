import { ProductRepository } from 'src/adapters/database/repositories/product.repository';
import { ProductService } from 'src/application/services/product.service';
import { DeleteProductUseCase } from 'src/application/usecases/product/delete-product.usecase';

describe('DeleteProductUseCase', () => {
  let deleteProductUseCase: DeleteProductUseCase;
  let mockProductService: ProductService;

  beforeEach(() => {
    const mockProductRepository = {} as ProductRepository;
    mockProductService = new ProductService(mockProductRepository);
    deleteProductUseCase = new DeleteProductUseCase(mockProductService);
  });

  describe('execute', () => {
    it('should delete a product', async () => {
      jest
        .spyOn(mockProductService, 'delete')
        .mockImplementation(() => Promise.resolve());

      await deleteProductUseCase.execute(1);

      expect(mockProductService.delete).toHaveBeenCalledWith(1);
    });
  });
});
