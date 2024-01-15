import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsString, Min } from 'class-validator';

class Product {
  @IsInt()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  nome: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  amount: number;

  @IsInt()
  @ApiProperty()
  category_id: number;
}

export class CreateOrderDTO {
  @IsDecimal()
  @ApiProperty()
  total: any;

  @ApiProperty()
  user_id: number;

  @ApiProperty({ type: () => [Product] })
  products: Partial<Product>[];
}
