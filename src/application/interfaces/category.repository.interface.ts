import { Category } from '@prisma/client';
import { CreateCategoryDTO } from 'src/application/dtos/create-category.dto';

export interface ICategory {
  findAll(): Promise<Category[]>;
  findOne(id: number): Promise<Category>;
  create(category: CreateCategoryDTO): Promise<Category>;
  update(id: number, categoria: Partial<Category>): Promise<Category>;
  remove(id: number): Promise<void>;
}
