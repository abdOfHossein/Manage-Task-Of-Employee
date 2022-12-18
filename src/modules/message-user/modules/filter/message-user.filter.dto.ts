import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class MessageUserFilterDto {
  @ApiProperty()
  @Allow()
  publish_date: Date;

  @ApiProperty()
  @Allow()
  content: string;

  @ApiProperty()
  @Allow()
  seen: number;
}
