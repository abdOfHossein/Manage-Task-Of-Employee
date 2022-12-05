import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';

export class TaskTypeFilterDto {
  @ApiProperty({ default: TypeTaskEnum.DOING })
  @Allow()
  type: TypeTaskEnum;
}
