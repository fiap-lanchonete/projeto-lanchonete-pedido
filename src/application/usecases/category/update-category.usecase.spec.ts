import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { CategoryService } from 'src/application/services/category.service';
import { UpdateCategoryUseCase } from 'src/application/usecases/category/update-category.usecase';

describe('UpdateCategoryUseCase', () => {
  let updateCategoryUseCase: UpdateCategoryUseCase;
  let mockCategoryService: CategoryService;

  beforeEach(() => {
    const mockCategoryRepository = {} as CategoryRepository;

    mockCategoryService = new CategoryService(mockCategoryRepository);
    updateCategoryUseCase = new UpdateCategoryUseCase(mockCategoryService);
  });

  describe('execute', () => {
    it('should update a category', async () => {
      const category = {
        id: 1,
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockCategoryService, 'update')
        .mockImplementation(() => Promise.resolve(category));

      const result = await updateCategoryUseCase.execute({
        id: 1,
        data: {
          name: 'Test Category',
        },
      });

      expect(result).toEqual(category);
    });
  });
});
