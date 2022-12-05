import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { CalenderFilterDto } from '../filter/calender.filter.dto';

export class CalenderPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: CalenderFilterDto;
}
