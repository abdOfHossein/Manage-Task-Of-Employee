import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PriorityEventEnum } from '../enums/priority-event.enum';

export class EventFilterDto {
  @ApiProperty()
  @Allow()
  priority: PriorityEventEnum;

  @ApiProperty()
  @Allow()
  start_date: Date;

  @ApiProperty()
  @Allow()
  end_date: Date;

  @ApiProperty()
  @Allow()
  title: string;
}
