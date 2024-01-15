import { Injectable } from '@nestjs/common';
import { PrismaHelper } from '../helpers/prisma.helper';
import { IOrder } from 'src/application/interfaces/order.repository.interface';
import { Order } from '@prisma/client';

@Injectable()
export class OrderRepository implements IOrder {
  constructor(private readonly prisma: PrismaHelper) {}

  async findOne(id: number): Promise<Order> {
    return await this.prisma.order.findUnique({
      where: { id },
    });
  }

  async findOneToPayment(id: number): Promise<Order> {
    return await this.prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  async create(order: Order): Promise<Order> {
    return await this.prisma.order.create({
      data: order,
    });
  }

  async update(id: number, order: Order): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: order,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}
