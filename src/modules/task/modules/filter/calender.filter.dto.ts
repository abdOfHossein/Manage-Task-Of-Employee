import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class CalenderFilterDto {
  @Allow()
  @ApiProperty()
  first_time: string;

  @Allow()
  @ApiProperty()
  second_time: string;
}
