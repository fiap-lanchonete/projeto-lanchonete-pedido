import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsNumber } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  price: number;

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
