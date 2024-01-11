import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { CategoryService } from 'src/application/services/category.service';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let mockCategoryRepository: CategoryRepository;
  let mockPrismaHelper: PrismaHelper;

  beforeEach(() => {
    mockPrismaHelper = {} as PrismaHelper;
    mockCategoryRepository = new CategoryRepository(mockPrismaHelper);
    categoryService = new CategoryService(mockCategoryRepository);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
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
        .spyOn(mockCategoryRepository, 'findAll')
        .mockImplementation(() => Promise.resolve(categories));

      const result = await categoryService.findAll();

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
    });

    it('should return an empty array if no categories are found', async () => {
      jest
        .spyOn(mockCategoryRepository, 'findAll')
        .mockImplementation(() => Promise.resolve([]));

      const categories = await categoryService.findAll();

      expect(categories).toBeDefined();
      expect(categories).toBeInstanceOf(Array);
      expect(categories).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return a category if found', async () => {
      const category = {
        id: 1,
        name: 'Category 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockCategoryRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(category));

      const result = await categoryService.findOne(1);

      expect(result).toBeDefined();
      expect(result).toEqual(category);
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const category = {
        id: 1,
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockCategoryRepository, 'create')
        .mockImplementation(() => Promise.resolve(category));

      const result = await categoryService.create({
        name: 'Test Category',
      });

      expect(result).toBeDefined();
      expect(result).toEqual(category);
    });
  });

  describe('update', () => {
    it('should update an existing category', async () => {
      const category = {
        id: 1,
        name: 'Updated Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockCategoryRepository, 'update')
        .mockImplementation(() => Promise.resolve(category));

      jest
        .spyOn(mockCategoryRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(category));

      const result = await categoryService.update(1, {
        name: 'Updated Category',
      });

      expect(result).toBeDefined();
      expect(result).toEqual(category);
    });
  });

  describe('delete', () => {
    it('should delete an existing category', async () => {
      jest
        .spyOn(mockCategoryRepository, 'remove')
        .mockImplementation(() => Promise.resolve());

      await categoryService.delete(1);

      expect(mockCategoryRepository.remove).toHaveBeenCalledTimes(1);
      expect(mockCategoryRepository.remove).toHaveBeenCalledWith(1);
    });
  });
});
