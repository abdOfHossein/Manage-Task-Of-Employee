import { ApiProperty } from '@nestjs/swagger';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';

export class UpdateTaskDto {
  @ApiProperty()
  priority: string;

  @ApiProperty()
  tittle: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  head_id: string;

  @ApiProperty({ default: TypeTaskEnum.DOING })
  type: TypeTaskEnum;

  @ApiProperty({ default: StatusTaskEnum.NEWTASK })
  status: StatusTaskEnum;
}
