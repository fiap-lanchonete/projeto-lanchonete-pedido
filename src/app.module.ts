import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CategoryController } from 'src/adapters/controllers/category/category.controller';

import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { CategoryService } from 'src/application/services/category.service';
import { CreateCategoryUseCase } from 'src/application/usecases/category/create-category.usecase';
import { DeleteCategoryUseCase } from 'src/application/usecases/category/delete-category.usecase';
import { GetAllCategoriesUseCase } from 'src/application/usecases/category/get-all-categories.usecase';
import { GetCategoryUseCase } from 'src/application/usecases/category/get-category.usecase';
import { UpdateCategoryUseCase } from 'src/application/usecases/category/update-category.usecase';
@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    GetAllCategoriesUseCase,
    CreateCategoryUseCase,
    GetCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    {
      provide: 'CategoryRepository',
      useClass: CategoryRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    PrismaHelper,
  ],
})
export class AppModule {}
