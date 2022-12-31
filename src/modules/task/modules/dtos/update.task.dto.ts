import { ApiProperty } from '@nestjs/swagger';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';

export class UpdateTaskDto {
  @ApiProperty()
  priority: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  head_id: string;

  @ApiProperty()
  do_date: Date;

  @ApiProperty()
  remain_date: Date;

  @ApiProperty({ default: TypeTaskEnum.NEWTASK })
  type: TypeTaskEnum;

  @ApiProperty({ default: StatusTaskEnum.DOING })
  status: StatusTaskEnum;
}
