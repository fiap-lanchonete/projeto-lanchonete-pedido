import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { CategoryService } from 'src/application/services/category.service';
import { DeleteCategoryUseCase } from 'src/application/usecases/category/delete-category.usecase';

describe('DeleteCategoryUseCase', () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase;
  let mockCategoryService: CategoryService;

  beforeEach(() => {
    const mockCategoryRepository = {} as CategoryRepository;
    mockCategoryService = new CategoryService(mockCategoryRepository);
    deleteCategoryUseCase = new DeleteCategoryUseCase(mockCategoryService);
  });

  describe('execute', () => {
    it('should delete a category', async () => {
      jest
        .spyOn(mockCategoryService, 'delete')
        .mockImplementation(() => Promise.resolve());

      await deleteCategoryUseCase.execute(1);

      expect(mockCategoryService.delete).toHaveBeenCalledWith(1);
    });
  });
});
