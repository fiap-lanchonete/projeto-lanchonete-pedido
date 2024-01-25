import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
