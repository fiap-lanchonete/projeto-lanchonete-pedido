import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

class Product {
  @IsInt()
  @ApiProperty()
  id: number;
}

export class UpdateOrderDTO {
  @ApiProperty({ type: () => [Product] })
  products: Partial<Product>[];
}
