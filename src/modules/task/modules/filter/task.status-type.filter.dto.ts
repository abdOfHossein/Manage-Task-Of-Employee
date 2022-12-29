import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { StatusTaskEnum } from '../enums/status-task.enum'; 
import { TypeTaskEnum } from '../enums/type-task.enum';  

export class TaskTypeStatusFilterDto {
  @ApiProperty()
  @Allow()
  type: TypeTaskEnum;

  @ApiProperty()
  @Allow()
  status: StatusTaskEnum;
}
