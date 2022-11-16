import { ApiProperty } from '@nestjs/swagger';
import { TaskEnt } from '../entities/task.entity';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';
export class TaskCUDto {
  @ApiProperty()
  id_task: string;

  @ApiProperty()
  priority: string;

  @ApiProperty()
  tittle: string;

  @ApiProperty()
  head_id: string;

  @ApiProperty()
  type: TypeTaskEnum;

  @ApiProperty()
  status: StatusTaskEnum;
  constructor(init?: Partial<TaskEnt>) {
    this.id_task = init.id;
    this.priority = init.priority;
    this.tittle = init.tittle;
    this.head_id = init.head_id;
    this.type = init.type;
  }
}
