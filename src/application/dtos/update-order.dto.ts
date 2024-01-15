import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, IsDecimal } from 'class-validator';

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

export class UpdateOrderDTO {
  @IsDecimal()
  @ApiProperty()
  total: any;

  @ApiProperty()
  user_id: number;

  @ApiProperty({ type: () => [Product] })
  products: Partial<Product>[];
}
