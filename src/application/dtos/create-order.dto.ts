import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  cpf?: number;
}
