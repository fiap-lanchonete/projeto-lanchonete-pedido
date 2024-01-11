import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { CategoryService } from 'src/application/services/category.service';
import { CreateCategoryUseCase } from 'src/application/usecases/category/create-category.usecase';

describe('CreateCategoryUseCase', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let mockCategoryService: CategoryService;

  beforeEach(() => {
    const mockCategoryRepository = {} as CategoryRepository;
    mockCategoryService = new CategoryService(mockCategoryRepository);
    createCategoryUseCase = new CreateCategoryUseCase(mockCategoryService);
  });

  describe('execute', () => {
    it('should create a category', async () => {
      const category = {
        id: 1,
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockCategoryService, 'create')
        .mockImplementation(() => Promise.resolve(category));

      const createdCategory = await createCategoryUseCase.execute({
        name: 'Test Category',
      });
      expect(createdCategory).toBeDefined();
    });

    it('should throw an error if category already exists', async () => {
      const category = {
        name: 'Test Category',
      };

      jest.spyOn(mockCategoryService, 'create').mockImplementation(() =>
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

      expect(createCategoryUseCase.execute(category)).rejects.toThrowError();
    });
  });
});
