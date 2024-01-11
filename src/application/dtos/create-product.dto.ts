import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDecimal, IsInt, Min } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsDecimal(
    { force_decimal: true },
    { message: 'Preço deve ser um número válido' },
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
