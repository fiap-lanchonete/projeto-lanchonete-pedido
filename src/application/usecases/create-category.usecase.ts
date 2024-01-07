import { Injectable } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDTO } from 'src/application/dtos/create-category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(data: CreateCategoryDTO) {
    return await this.categoryService.create(data);
  }
}
