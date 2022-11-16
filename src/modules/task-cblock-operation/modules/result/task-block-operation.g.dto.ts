import { ApiProperty } from '@nestjs/swagger';
import { TaskBlockOperationEnt } from '../entities/task-block-operation.entity';

export class TaskBlockOperationGDto {
  @ApiProperty()
  id_task_block_operation: string;

  @ApiProperty()
  name_task_block_operation: string;

  @ApiProperty()
  desription_task_block_operation: string;

  constructor(init?: Partial<TaskBlockOperationEnt>) {
    this.id_task_block_operation = init.id;
    this.name_task_block_operation = init.name_task_block_operation;
    this.desription_task_block_operation = init.desription_task_block_operation;
  }
}
