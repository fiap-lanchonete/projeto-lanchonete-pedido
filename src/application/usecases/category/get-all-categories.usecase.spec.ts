import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { CategoryService } from 'src/application/services/category.service';
import { GetAllCategoriesUseCase } from 'src/application/usecases/category/get-all-categories.usecase';

describe('GetAllCategoriesUseCase', () => {
  let getAllCategoriesUseCase: GetAllCategoriesUseCase;
  let mockCategoryService: CategoryService;

  beforeEach(() => {
    const mockCategoryRepository = {} as CategoryRepository;

    mockCategoryService = new CategoryService(mockCategoryRepository);
    getAllCategoriesUseCase = new GetAllCategoriesUseCase(mockCategoryService);
  });

  describe('execute', () => {
    it('should get all categories', async () => {
      const categories = [
        {
          id: 1,
          name: 'Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Category 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(mockCategoryService, 'findAll')
        .mockImplementation(() => Promise.resolve(categories));

      const result = await getAllCategoriesUseCase.execute();

      expect(result).toEqual(categories);
    });

    it('should return an empty array if no categories are found', async () => {
      jest
        .spyOn(mockCategoryService, 'findAll')
        .mockImplementation(() => Promise.resolve([]));

      const result = await getAllCategoriesUseCase.execute();

      expect(result).toEqual([]);
    });
  });
});
