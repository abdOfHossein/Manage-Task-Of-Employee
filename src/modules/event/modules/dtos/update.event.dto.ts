import { ApiProperty } from '@nestjs/swagger';
import { PriorityEventEnum } from '../enums/priority-event.enum';

export class UpdateEventDto {
  @ApiProperty()
  priority: PriorityEventEnum;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  title: string;
}
