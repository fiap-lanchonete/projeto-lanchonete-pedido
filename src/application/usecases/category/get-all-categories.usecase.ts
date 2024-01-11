import { Injectable } from '@nestjs/common';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly categoryService: CategoryService) {}

  async execute() {
    return await this.categoryService.findAll();
  }
}
