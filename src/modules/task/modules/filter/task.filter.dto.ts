import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';

export class TaskFilterDto {
  @ApiProperty()
  @Allow()
  priority: string;

  @ApiProperty()
  @Allow()
  tittle: string;

  @ApiProperty()
  @Allow()
  head_id: string;

  @ApiProperty()
  @Allow()
  type: TypeTaskEnum;

  @ApiProperty()
  @Allow()
  status: StatusTaskEnum;
}
