import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class RelTaskFilterDto {
  @ApiProperty()
  @Allow()
  comment: string;
}
