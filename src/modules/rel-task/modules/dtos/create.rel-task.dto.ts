import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import { StatusTaskEnum } from 'src/modules/task/modules/enums/status-task.enum';
import { TypeTaskEnum } from 'src/modules/task/modules/enums/type-task.enum';

export class CreateRelTaskDto {
  @ApiProperty()
  priority: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  head_id: string;

  @ApiProperty({ default: TypeTaskEnum.FORWARD })
  type: TypeTaskEnum;

  @ApiProperty({ default: StatusTaskEnum.REL })
  status: StatusTaskEnum;

  @ApiHideProperty()
  id_src: string;

  @ApiHideProperty()
  id_ref: string;

  @ApiHideProperty()
  refEnt: TaskEnt;

  @ApiHideProperty()
  srcEnt: TaskEnt;

  @ApiProperty()
  comment: string;
}
