import { HttpModule } from '@nestjs/axios';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CategoryController } from 'src/adapters/controllers/category/category.controller';
import { OrderController } from 'src/adapters/controllers/order/order.controller';
import { ProductController } from 'src/adapters/controllers/product/product.controller';

import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { CategoryRepository } from 'src/adapters/database/repositories/category.repository';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { ProductRepository } from 'src/adapters/database/repositories/product.repository';
import { CategoryService } from 'src/application/services/category.service';
import { OrderService } from 'src/application/services/order.service';
import { ProductService } from 'src/application/services/product.service';
import { CreateCategoryUseCase } from 'src/application/usecases/category/create-category.usecase';
import { DeleteCategoryUseCase } from 'src/application/usecases/category/delete-category.usecase';
import { GetAllCategoriesUseCase } from 'src/application/usecases/category/get-all-categories.usecase';
import { GetCategoryUseCase } from 'src/application/usecases/category/get-category.usecase';
import { UpdateCategoryUseCase } from 'src/application/usecases/category/update-category.usecase';
import { CreateOrderUseCase } from 'src/application/usecases/order/create-order.usecase';
import { GetOrderUseCase } from 'src/application/usecases/order/get-order.usecase';
import { StartPaymentUseCase } from 'src/application/usecases/order/start-payment.usecase';
import { UpdateOrderUseCase } from 'src/application/usecases/order/update-order.usecase';
import { CreateProductUseCase } from 'src/application/usecases/product/create-product.usecase';
import { DeleteProductUseCase } from 'src/application/usecases/product/delete-product.usecase';
import { GetAllProductsUseCase } from 'src/application/usecases/product/get-all-products.usecase';
import { GetProductUseCase } from 'src/application/usecases/product/get-product.usecase';
import { UpdateProductsUseCase } from 'src/application/usecases/product/update-product.usecase';
@Module({
  imports: [HttpModule],
  controllers: [CategoryController, ProductController, OrderController],
  providers: [
    CategoryService,
    ProductService,
    OrderService,
    GetAllCategoriesUseCase,
    CreateCategoryUseCase,
    GetCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    GetAllProductsUseCase,
    CreateProductUseCase,
    GetProductUseCase,
    UpdateProductsUseCase,
    DeleteProductUseCase,
    GetOrderUseCase,
    CreateOrderUseCase,
    UpdateOrderUseCase,
    StartPaymentUseCase,
    {
      provide: 'CategoryRepository',
      useClass: CategoryRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'OrderRepository',
      useClass: OrderRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    PrismaHelper,
  ],
})
export class AppModule {}
