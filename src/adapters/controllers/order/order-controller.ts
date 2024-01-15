import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateOrderDTO } from 'src/application/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/application/dtos/update-order.dto';
import { CreateOrderUseCase } from 'src/application/usecases/order/create-order.usecase';
import { GetOrderUseCase } from 'src/application/usecases/order/get-order.usecase';
import { UpdateOrderUseCase } from 'src/application/usecases/order/update-order.usecase';

@ApiTags('Order')
@Controller('v1/order')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
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
  @ApiOperation({ summary: 'Get order by id' })
  @ApiParam({ name: 'id', type: 'string' })
  async updateOrder(@Param('id') id: string, @Body() data: UpdateOrderDTO) {
    return await this.updateOrderUseCase.execute(Number(id), data);
  }
}
