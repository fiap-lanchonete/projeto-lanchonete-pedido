import { ConflictException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CategoryController } from 'src/adapters/controllers/category/category.controller';
import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { CategoryService } from 'src/application/services/category.service';
import { CreateCategoryUseCase } from 'src/application/usecases/category/create-category.usecase';
import { DeleteCategoryUseCase } from 'src/application/usecases/category/delete-category.usecase';
import { GetAllCategoriesUseCase } from 'src/application/usecases/category/get-all-categories.usecase';
import { GetCategoryUseCase } from 'src/application/usecases/category/get-category.usecase';
import { UpdateCategoryUseCase } from 'src/application/usecases/category/update-category.usecase';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let createCategoryUseCase: CreateCategoryUseCase;
  let deleteCategoryUsecase: DeleteCategoryUseCase;
  let getAllCategoriesUseCase: GetAllCategoriesUseCase;
  let getCategoryUseCase: GetCategoryUseCase;
  let updateCategoryUseCase: UpdateCategoryUseCase;
  let mockCategoryService: CategoryService;

  beforeEach(() => {
    const mockCategoryRepository = {} as CategoryRepository;
    mockCategoryService = new CategoryService(mockCategoryRepository);
    createCategoryUseCase = new CreateCategoryUseCase(mockCategoryService);
    deleteCategoryUsecase = new DeleteCategoryUseCase(mockCategoryService);
    getAllCategoriesUseCase = new GetAllCategoriesUseCase(mockCategoryService);
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
      jest.spyOn(createCategoryUseCase, 'execute');

      expect(
        await categoryController.createCategory({
          name: 'Category 1',
        }),
      ).toEqual(mockCategory);
      expect(createCategoryUseCase.execute).toHaveBeenCalledWith({
        name: 'Category 1',
      });
    });

    it('should throw generic error if is not a duplication error', async () => {
      jest
        .spyOn(mockCategoryService, 'create')
        .mockImplementation(() =>
          Promise.reject(new Error('Something went wrong')),
        );

      expect(
        categoryController.createCategory({
          name: 'Category 1',
        }),
      ).rejects.toThrow(Error);
    });

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
  });

  describe('getCategory', () => {
    it('should retrieve a category by id', async () => {
      const mockCategory: Category = {
        id: 1,
        name: 'Category 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockCategoryService, 'findOne')
        .mockImplementation(() => Promise.resolve(mockCategory));
      jest.spyOn(getCategoryUseCase, 'execute');

      expect(await categoryController.getCategory('1')).toEqual(mockCategory);
      expect(getCategoryUseCase.execute).toHaveBeenCalledWith(1);
    });
  });

  describe('updateCategory', () => {
    it('should update a category by id', async () => {
      const mockCategory: Category = {
        id: 1,
        name: 'Category 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockCategoryService, 'update')
        .mockImplementation(() => Promise.resolve(mockCategory));
      jest.spyOn(updateCategoryUseCase, 'execute');

      expect(
        await categoryController.updateCategory('1', {
          name: 'Category 1',
        }),
      ).toEqual(mockCategory);
      expect(updateCategoryUseCase.execute).toHaveBeenCalledWith({
        data: {
          name: 'Category 1',
        },
        id: 1,
      });
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category by id', async () => {
      jest
        .spyOn(mockCategoryService, 'delete')
        .mockImplementation(() => Promise.resolve());
      jest.spyOn(deleteCategoryUsecase, 'execute');

      await categoryController.deleteCategory('1');

      expect(mockCategoryService.delete).toHaveBeenCalledWith(1);
      expect(mockCategoryService.delete).toHaveBeenCalledTimes(1);
      expect(deleteCategoryUsecase.execute).toHaveBeenCalledWith(1);
    });
  });
});
