import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/application/services/product.service';

@Injectable()
export class GetAllProductUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute() {
    return await this.productService.findAll();
  }
}
