import { ConflictException } from '@nestjs/common';
import { Product } from '@prisma/client';
import {
  Decimal,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';
import { ProductController } from 'src/adapters/controllers/product/product.controller';
import { ProductRepository } from 'src/adapters/database/repositories/product.repository';
import { ProductService } from 'src/application/services/product.service';
import { CreateProductUseCase } from 'src/application/usecases/product/create-product.usecase';
import { DeleteProductUseCase } from 'src/application/usecases/product/delete-product.usecase';
import { GetAllProductsUseCase } from 'src/application/usecases/product/get-all-products.usecase';
import { GetProductUseCase } from 'src/application/usecases/product/get-product.usecase';
import { UpdateProductsUseCase } from 'src/application/usecases/product/update-product.usecase';

describe('ProductController', () => {
  let productController: ProductController;
  let createProductUseCase: CreateProductUseCase;
  let deleteProductUseCase: DeleteProductUseCase;
  let getAllProductsUseCase: GetAllProductsUseCase;
  let getProductUseCase: GetProductUseCase;
  let updateProductUseCase: UpdateProductsUseCase;
  let mockProductService: ProductService;

  beforeEach(() => {
    const mockProductRepository = {} as ProductRepository;
    mockProductService = new ProductService(mockProductRepository);
    createProductUseCase = new CreateProductUseCase(mockProductService);
    deleteProductUseCase = new DeleteProductUseCase(mockProductService);
    getAllProductsUseCase = new GetAllProductsUseCase(mockProductService);
    getProductUseCase = new GetProductUseCase(mockProductService);
    updateProductUseCase = new UpdateProductsUseCase(mockProductService);

    productController = new ProductController(
      createProductUseCase,
      getAllProductsUseCase,
      getProductUseCase,
      updateProductUseCase,
      deleteProductUseCase,
    );
  });

  describe('getAllProducts', () => {
    it('should return a list of products', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          price: new Decimal('10'),
          amount: 1,
          description: 'Description 1',
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(mockProductService, 'findAll')
        .mockImplementation(() => Promise.resolve(mockProducts));

      expect(await productController.getAllProducts()).toEqual(mockProducts);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const mockProduct: Product = {
        id: 1,
        name: 'Product 1',
        price: new Decimal('10'),
        amount: 1,
        description: 'Description 1',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockProductService, 'create')
        .mockImplementation(() => Promise.resolve(mockProduct));

      expect(
        await productController.createProduct({
          name: 'Product 1',
          price: new Decimal('10'),
          amount: 1,
          description: 'Description 1',
          category_id: 1,
        }),
      ).toEqual(mockProduct);
    });

    it('should throw generic error if is not a duplication error', async () => {
      jest
        .spyOn(mockProductService, 'create')
        .mockImplementation(() =>
          Promise.reject(new Error('Something went wrong')),
        );

      expect(
        productController.createProduct({
          name: 'Category 1',
          amount: 1,
          category_id: 1,
          description: 'Test',
          price: 1.2,
        }),
      ).rejects.toThrow(Error);
    });

    it('should retrieve 409 exception if category already exists', async () => {
      jest.spyOn(mockProductService, 'create').mockImplementation(() =>
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
        productController.createProduct({
          name: 'Category 1',
          amount: 1,
          category_id: 1,
          description: 'Test',
          price: 1.2,
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('getProduct', () => {
    it('should retrieve a product by id', async () => {
      const mockProduct: Product = {
        id: 1,
        name: 'Product 1',
        price: new Decimal('10'),
        amount: 1,
        description: 'Description 1',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockProductService, 'findOne')
        .mockImplementation(() => Promise.resolve(mockProduct));

      expect(await productController.getProduct('1')).toEqual(mockProduct);
    });
  });

  describe('updateProduct', () => {
    it('should update a product by id', async () => {
      const mockProduct: Product = {
        id: 1,
        name: 'Product 1',
        price: new Decimal('10'),
        amount: 1,
        description: 'Description 1',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockProductService, 'update')
        .mockImplementation(() => Promise.resolve(mockProduct));

      expect(
        await productController.updateProduct('1', {
          id: 1,
          name: 'Product 1',
          price: new Decimal('10'),
          amount: 1,
          description: 'Description 1',
          category_id: 1,
        }),
      ).toEqual(mockProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by id', async () => {
      jest
        .spyOn(mockProductService, 'delete')
        .mockImplementation(() => Promise.resolve());

      expect(await productController.deleteProduct('1')).toBeUndefined();
    });
  });
});
