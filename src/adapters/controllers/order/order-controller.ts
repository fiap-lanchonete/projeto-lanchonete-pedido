import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateOrderDTO } from 'src/application/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/application/dtos/update-order.dto';
import { CreateOrderUseCase } from 'src/application/usecases/order/create-order.usecase';
import { GetOrderUseCase } from 'src/application/usecases/order/get-order.usecase';
import { StartPaymentUseCase } from 'src/application/usecases/order/start-payment.usecase';
import { UpdateOrderUseCase } from 'src/application/usecases/order/update-order.usecase';

@ApiTags('Order')
@Controller('v1/order')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly startPaymentUseCase: StartPaymentUseCase,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Creates a new order' })
  async createOrder(@Body() data: CreateOrderDTO) {
    return await this.createOrderUseCase.execute(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiParam({ name: 'id', type: 'string' })
  async getOrder(@Param('id') id: string) {
    return await this.getOrderUseCase.execute(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order by id' })
  @ApiParam({ name: 'id', type: 'string' })
  async updateProductsOrder(
    @Param('id') id: string,
    @Body() data: Partial<UpdateOrderDTO>,
  ) {
    return await this.updateOrderUseCase.execute(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove order by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeOrder(@Param('id') id: string, @Body() data: UpdateOrderDTO) {
    return await this.updateOrderUseCase.execute(Number(id), data);
  }

  @Post('/start-payment/:id')
  @ApiOperation({ summary: 'Start Payment process' })
  @ApiParam({ name: 'id', type: 'string' })
  @HttpCode(HttpStatus.CREATED)
  async startPayment(@Param('id') id: string) {
    return await this.startPaymentUseCase.execute(Number(id));
  }
}
