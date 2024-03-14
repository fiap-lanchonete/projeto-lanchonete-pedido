import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  cpf?: string;

  @ApiProperty()
  @IsString()
  idempotent_key: string;
}
