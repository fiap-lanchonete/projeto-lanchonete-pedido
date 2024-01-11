import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CategoryController } from 'src/adapters/controllers/category/category.controller';
import { ProductController } from 'src/adapters/controllers/product/product.controller';

import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { ProductRepository } from 'src/adapters/database/repositories/product.repository';
import { CategoryService } from 'src/application/services/category.service';
import { ProductService } from 'src/application/services/product.service';
import { CreateCategoryUseCase } from 'src/application/usecases/category/create-category.usecase';
import { DeleteCategoryUseCase } from 'src/application/usecases/category/delete-category.usecase';
import { GetAllCategoriesUseCase } from 'src/application/usecases/category/get-all-categories.usecase';
import { GetCategoryUseCase } from 'src/application/usecases/category/get-category.usecase';
import { UpdateCategoryUseCase } from 'src/application/usecases/category/update-category.usecase';
import { CreateProductUseCase } from 'src/application/usecases/product/create-product.usecase';
import { DeleteProductUseCase } from 'src/application/usecases/product/delete-product.usecase';
import { GetAllProductUseCase } from 'src/application/usecases/product/get--all-product.usecase';
import { GetProductUseCase } from 'src/application/usecases/product/get-product.usecase';
import { UpdateProductsUseCase } from 'src/application/usecases/product/update-product.usecase';
@Module({
  imports: [],
  controllers: [CategoryController, ProductController],
  providers: [
    CategoryService,
    ProductService,
    GetAllCategoriesUseCase,
    CreateCategoryUseCase,
    GetCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    GetAllProductUseCase,
    CreateProductUseCase,
    GetProductUseCase,
    UpdateProductsUseCase,
    DeleteProductUseCase,
    {
      provide: 'CategoryRepository',
      useClass: CategoryRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    PrismaHelper,
  ],
})
export class AppModule {}
