import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/application/services/product.service';

@Injectable()
export class UpdateProductsUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute({
    id,
    data,
  }: {
    id: number;
    data: Partial<Product.Data | any>;
  }) {
    return await this.productService.update(id, data);
  }
}
