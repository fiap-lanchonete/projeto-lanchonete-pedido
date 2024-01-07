import { Injectable } from '@nestjs/common';
import { PrismaHelper } from '../helpers/prisma.helper';
import { ICategory } from 'src/application/interfaces/category.repository.interface';
import { Category } from '@prisma/client';
import { CreateCategoryDTO } from 'src/application/dtos/create-category.dto';
import { UpdateCategoryDTO } from 'src/application/dtos/update-category.dto';

@Injectable()
export class CategoryRepository implements ICategory {
  constructor(private readonly prisma: PrismaHelper) {}

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category> {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async create(category: CreateCategoryDTO): Promise<Category> {
    return await this.prisma.category.create({
      data: {
        name: category.name,
      },
    });
  }

  async update(id: number, categoria: UpdateCategoryDTO): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data: categoria,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }
}
