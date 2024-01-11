import { Injectable } from '@nestjs/common';
import { Product } from 'src/@types/product';
import { ProductService } from 'src/application/services/product.service';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute(data: Partial<Product.Data>) {
    return this.productService.create(data);
  }
}
