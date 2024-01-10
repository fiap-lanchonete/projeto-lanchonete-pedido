import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDTO } from 'src/application/dtos/create-category.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(data: CreateCategoryDTO) {
    try {
      return await this.categoryService.create(data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Category already exists');
        }
      }

      throw error;
    }
  }
}
