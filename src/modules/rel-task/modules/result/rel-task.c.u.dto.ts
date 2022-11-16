import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import { RelTaskEnt } from '../entities/rel-task.entity';
export class RelTaskCUDto {
  @ApiProperty()
  id_rel_task: string;

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

  constructor(init?: Partial<RelTaskEnt>) {
    this.id_rel_task = init.id;
    this.comment = init.comment;
    this.refEnt = init.ref;
    this.srcEnt = init.src;
  }
}
