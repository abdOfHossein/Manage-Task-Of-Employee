import { BasicEnt } from 'src/common/entities/basic.entity';
import { SchemaEntityEnum } from 'src/common/enums/schema.entity.enum';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: SchemaEntityEnum.TASK, name: 'rel_task' })
export class RelTaskEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  comment: string;

  @OneToOne(() => TaskEnt, (src) => src.last_rel_task)
  @JoinColumn()
  src: TaskEnt;

  @OneToOne(() => TaskEnt, (ref) => ref.new_rel_task)
  @JoinColumn()
  ref: TaskEnt;
}
