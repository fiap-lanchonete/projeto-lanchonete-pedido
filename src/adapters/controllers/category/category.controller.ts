import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators
import { CreateCategoryDTO } from 'src/application/dtos/create-category.dto';
import { UpdateCategoryDTO } from 'src/application/dtos/update-category.dto';
import { CreateCategoryUseCase } from 'src/application/usecases/category/create-category.usecase';
import { DeleteCategoryUseCase } from 'src/application/usecases/category/delete-category.usecase';
import { GetAllCategoriesUseCase } from 'src/application/usecases/category/get-all-categories.usecase';
import { GetCategoryUseCase } from 'src/application/usecases/category/get-category.usecase';
import { UpdateCategoryUseCase } from 'src/application/usecases/category/update-category.usecase';

@ApiTags('Category')
@Controller('v1/category')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDTO })
  async createCategory(@Body() data: CreateCategoryDTO) {
    return await this.createCategoryUseCase.execute(data);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all categories' })
  async getAllCategories() {
    return await this.getAllCategoriesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', type: 'integer' })
  async getCategory(@Param('id') id: string) {
    return await this.getCategoryUseCase.execute(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', type: 'integer' })
  @ApiBody({ type: UpdateCategoryDTO })
  async updateCategory(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDTO,
  ) {
    return await this.updateCategoryUseCase.execute({ id: Number(id), data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', type: 'integer' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param('id') id: string) {
    return await this.deleteCategoryUseCase.execute(Number(id));
  }
}
