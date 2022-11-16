import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';

export class UpdateTaskBlockOperationDto {
  @ApiHideProperty()
  id_task: string;

  @ApiHideProperty()
  taskEnt: TaskEnt;

  @ApiProperty()
  name_task_block_operation: string;

  @ApiProperty()
  desription_task_block_operation: string;
}
