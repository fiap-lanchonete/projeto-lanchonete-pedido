import { ConflictException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CategoryController } from 'src/adapters/controllers/category/category.controller';
import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { CategoryService } from 'src/application/services/category.service';
import { CreateCategoryUseCase } from 'src/application/usecases/create-category.usecase';
import { DeleteCategoryUseCase } from 'src/application/usecases/delete-category.usecase';
import { GetAllCategoryUseCase } from 'src/application/usecases/get--all-category.usecase';
import { GetCategoryUseCase } from 'src/application/usecases/get-category.usecase';
import { UpdateCategoryUseCase } from 'src/application/usecases/update-category.usecase';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let createCategoryUseCase: CreateCategoryUseCase;
  let deleteCategoryUsecase: DeleteCategoryUseCase;
  let getAllCategoriesUseCase: GetAllCategoryUseCase;
  let getCategoryUseCase: GetCategoryUseCase;
  let updateCategoryUseCase: UpdateCategoryUseCase;
  let mockCategoryService: CategoryService;

  beforeEach(() => {
    const mockCategoryRepository = {} as CategoryRepository;
    mockCategoryService = new CategoryService(mockCategoryRepository);
    createCategoryUseCase = new CreateCategoryUseCase(mockCategoryService);
    deleteCategoryUsecase = new DeleteCategoryUseCase(mockCategoryService);
    getAllCategoriesUseCase = new GetAllCategoryUseCase(mockCategoryService);
    getCategoryUseCase = new GetCategoryUseCase(mockCategoryService);
    updateCategoryUseCase = new UpdateCategoryUseCase(mockCategoryService);

    categoryController = new CategoryController(
      createCategoryUseCase,
      getAllCategoriesUseCase,
      getCategoryUseCase,
      updateCategoryUseCase,
      deleteCategoryUsecase,
    );
  });

  describe('getAllCategories', () => {
    it('should return a list of categories', async () => {
      const mockedCategories: Category[] = [
        {
          id: 1,
          name: 'Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(mockCategoryService, 'findAll')
        .mockImplementation(() => Promise.resolve(mockedCategories));

      expect(await categoryController.getAllCategories()).toEqual(
        mockedCategories,
      );
    });
  });

  describe('createCategory', () => {
    it('should retrieve 409 exception if category already exists', async () => {
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

      expect(
        categoryController.createCategory({
          name: 'Category 1',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a new category', async () => {
      const mockCategory: Category = {
        id: 1,
        name: 'Category 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockCategoryService, 'create')
        .mockImplementation(() => Promise.resolve(mockCategory));

      expect(
        await categoryController.createCategory({
          name: 'Category 1',
        }),
      ).toEqual(mockCategory);
    });
  });
});
