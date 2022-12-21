import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { TypeTaskEnum } from '../enums/type-task.enum';

export class TaskTypeFilterDto {
  @ApiProperty({ default: TypeTaskEnum.NEWTASK })
  @Allow()
  type: TypeTaskEnum;
}
