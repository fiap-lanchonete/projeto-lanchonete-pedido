import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaHelper } from '../helpers/prisma.helper';
import { IOrder } from 'src/application/interfaces/order.repository.interface';
import { Order, Product } from '@prisma/client';
import { UpdateOrderDTO } from 'src/application/dtos/update-order.dto';

@Injectable()
export class OrderRepository implements IOrder {
  constructor(private readonly prisma: PrismaHelper) {}

  async findOne(id: number): Promise<Order> {
    return await this.prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
      },
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
    try {
      return await this.prisma.order.create({
        data: order,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: number, order: UpdateOrderDTO): Promise<Order> {
    const orderFound = await this.prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!orderFound) {
      throw new ForbiddenException('Order cannot be found');
    }

    if (!order.products) {
      order.products = [];
    }

    const newProducts = order.products.filter((product) => {
      return !orderFound.products.some((item) => item.id === product.id);
    });

    const updatedProducts = [...order.products, ...newProducts] as Product[];

    const productsInRequest = await this.prisma.product.findMany({
      where: {
        id: {
          in: updatedProducts.map((product) => product.id),
        },
      },
    });

    const total = productsInRequest.reduce((accumulator, priceProduct) => {
      return accumulator + priceProduct.price;
    }, 0);

    const data = await this.prisma.order.update({
      where: { id },
      data: {
        products: {
          set: updatedProducts,
        },
        total,
      },
      include: {
        products: true,
      },
    });

    return data;
  }

  async remove(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}
