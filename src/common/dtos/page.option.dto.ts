import { ApiProperty } from '@nestjs/swagger';
import { BaseOptionsDto } from './base.options.dto';
import { Allow } from 'class-validator';

export class PageOptionsDto {
  @ApiProperty()
  @Allow()
  base: BaseOptionsDto;
  @ApiProperty({ default: 'id' })
  @Allow()
  field: string;
}
