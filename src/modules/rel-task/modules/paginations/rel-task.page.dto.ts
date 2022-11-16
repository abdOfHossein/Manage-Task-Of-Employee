import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { RelTaskFilterDto } from '../filter/rel-task.filter.dto';

export class RelTaskPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: RelTaskFilterDto;
}
