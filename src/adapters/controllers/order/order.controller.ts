import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

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

  @MessagePattern('identify_user')
  async receiveOrder(@Payload() data: CreateOrderDTO) {
    await this.createOrderUseCase.execute(data);
  }

  @Get(':idempotent_key')
  @ApiOperation({ summary: 'Get order by idempotent_key' })
  @ApiParam({ name: 'idempotent_key', type: 'string' })
  async getOrder(@Param('idempotent_key') idempotent_key: string) {
    return await this.getOrderUseCase.execute(idempotent_key);
  }

  @Put(':idempotent_key')
  @ApiOperation({ summary: 'Update order by id' })
  @ApiParam({ name: 'idempotent_key', type: 'string' })
  async updateProductsOrder(
    @Param('idempotent_key') idempotent_key: string,
    @Body() data: Partial<UpdateOrderDTO>,
  ) {
    return await this.updateOrderUseCase.execute(idempotent_key, data);
  }

  @Post('/start-payment/:idempotent_key')
  @ApiOperation({ summary: 'Start payment process' })
  @ApiParam({ name: 'idempotent_key', type: 'string' })
  @HttpCode(HttpStatus.CREATED)
  async startPayment(@Param('idempotent_key') idempotent_key: string) {
    return await this.startPaymentUseCase.execute(idempotent_key);
  }
}
