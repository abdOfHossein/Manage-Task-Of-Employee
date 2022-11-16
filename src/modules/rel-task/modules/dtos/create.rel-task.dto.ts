import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';

export class CreateRelTaskDto {
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
