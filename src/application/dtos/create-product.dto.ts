import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDecimal, IsInt, Min } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @ApiProperty()
  name: string;

  @IsDecimal(
    { force_decimal: true },
    { message: 'Price should be a valid number' },
  )
  @ApiProperty()
  price: any;

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
