import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class TaskBlockOperationFilterDto {
  @ApiProperty()
  @Allow()
  name_task_block_operation: string;

  @ApiProperty()
  @Allow()
  desription_task_block_operation: string;
}
