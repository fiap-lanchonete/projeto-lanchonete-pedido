import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { CategoryService } from 'src/application/services/category.service';
import { GetCategoryUseCase } from 'src/application/usecases/category/get-category.usecase';

describe('GetCategoryUseCase', () => {
  let getCategoryUseCase: GetCategoryUseCase;
  let mockCategoryService: CategoryService;

  beforeEach(() => {
    const mockCategoryRepository = {} as CategoryRepository;

    mockCategoryService = new CategoryService(mockCategoryRepository);
    getCategoryUseCase = new GetCategoryUseCase(mockCategoryService);
  });

  describe('execute', () => {
    it('should return a category', async () => {
      const category = {
        id: 1,
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockCategoryService, 'findOne')
        .mockImplementation(() => Promise.resolve(category));

      const result = await getCategoryUseCase.execute(1);

      expect(result).toEqual(category);
    });
  });
});
