import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger'; // Importe os decoradores do Swagger
import { CreateProductDTO } from 'src/application/dtos/create-product.dto';
import { UpdateProductDTO } from 'src/application/dtos/update-product.dto';
import { StartPaymentUseCase } from 'src/application/usecases/order/start-payment.usecase';
import { CreateProductUseCase } from 'src/application/usecases/product/create-product.usecase';
import { DeleteProductUseCase } from 'src/application/usecases/product/delete-product.usecase';
import { GetAllProductsUseCase } from 'src/application/usecases/product/get-all-products.usecase';
import { GetProductUseCase } from 'src/application/usecases/product/get-product.usecase';
import { UpdateProductsUseCase } from 'src/application/usecases/product/update-product.usecase';

@ApiTags('Product')
@Controller('v1/product')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductUseCase: GetAllProductsUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly updateProductUseCase: UpdateProductsUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly startPaymentUseCase: StartPaymentUseCase,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Create new product' })
  @ApiBody({ type: CreateProductDTO })
  async createProduct(@Body() data: CreateProductDTO) {
    return await this.createProductUseCase.execute(data);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all products' })
  async getAllProducts() {
    return await this.getAllProductUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  async getProduct(@Param('id') id: string) {
    return await this.getProductUseCase.execute(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateProductDTO })
  async updateProduct(@Param('id') id: string, @Body() data: UpdateProductDTO) {
    return await this.updateProductUseCase.execute({ id: Number(id), data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id') id: string) {
    return await this.deleteProductUseCase.execute(Number(id));
  }

  @Post('/start-payment/:id')
  @ApiOperation({ summary: 'Start Payment process' })
  @ApiParam({ name: 'id', type: 'string' })
  @HttpCode(HttpStatus.CREATED)
  async startPayment(@Param('id') id: string) {
    return await this.startPaymentUseCase.execute(Number(id));
  }
}
