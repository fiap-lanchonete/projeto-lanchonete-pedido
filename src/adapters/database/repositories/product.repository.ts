import { Injectable } from '@nestjs/common';

import { PrismaHelper } from '../helpers/prisma.helper';
import { IProduct } from 'src/application/interfaces/product.repository.interface';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository implements IProduct {
  constructor(private readonly prisma: PrismaHelper) {}

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(product: Product): Promise<Product> {
    return await this.prisma.product.create({
      data: product,
    });
  }

  async update(id: number, product: Product): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: product,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
