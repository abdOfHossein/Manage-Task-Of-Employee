import { ApiProperty } from '@nestjs/swagger';
import { EventEnt } from '../entities/event.entity';
import { PriorityEventEnum } from '../enums/priority-event.enum';
export class EventCUDto {
  @ApiProperty()
  id_Event: string;

  @ApiProperty()
  priority: PriorityEventEnum;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  title: string;

  constructor(init?: Partial<EventEnt>) {
    this.id_Event = init.id;
    this.priority = init.priority;
    this.start_date = init.start_date;
    this.end_date = init.end_date;
    this.title = init.title;
  }
}
