import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { ExpiredTaskFilterDto } from '../filter/expired.task.filter.dto';

export class ExpiredTaskPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: ExpiredTaskFilterDto;
}
