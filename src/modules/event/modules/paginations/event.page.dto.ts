import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { EventFilterDto } from '../filter/event.filter.dto';

export class EventPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: EventFilterDto;
}
