import { ApiProperty } from '@nestjs/swagger';
import { TaskEnt } from '../entities/task.entity';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';

export class TaskGDto {
  @ApiProperty()
  id_task: string;

  @ApiProperty()
  priority: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  head_id: string;

  @ApiProperty()
  type: TypeTaskEnum;

  @ApiProperty()
  status: StatusTaskEnum;

  @ApiProperty()
  do_date: Date;

  @ApiProperty()
  remain_date: Date;

  constructor(init?: Partial<TaskEnt>) {
    this.id_task = init.id;
    this.priority = init.priority;
    this.title = init.title;
    this.head_id = init.head_id;
    this.type = init.type;
    this.do_date = init.do_date;
    this.remain_date = init.remain_date;
  }
}
