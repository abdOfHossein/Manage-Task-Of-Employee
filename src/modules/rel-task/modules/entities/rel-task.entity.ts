import { BasicEnt } from 'src/common/entities/basic.entity';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'task' })
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
