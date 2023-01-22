import { BasicEnt } from 'src/common/entities/basic.entity';
import { SchemaEntityEnum } from 'src/common/enums/schema.entity.enum';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { RelTaskEnt } from 'src/modules/rel-task/modules/entities/rel-task.entity';
import { TaskBlockOperationEnt } from 'src/modules/task-cblock-operation/modules/entities/task-block-operation.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEnt } from '../../../user/modules/entities/user.entity';
import { CheckStatusTaskEnum } from '../enums/check-status.enum';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';

@Entity({ name: 'task' })
export class TaskEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  priority: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  head_id: string;

  @Column({ nullable: true, default: new Date() })
  do_date: Date;

  @Column({ nullable: true })
  remain_date: Date;

  @Column({ nullable: true, type: 'enum', enum: TypeTaskEnum })
  type: TypeTaskEnum;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true, type: 'enum', enum: StatusTaskEnum })
  status: StatusTaskEnum;

  @Column({ nullable: true, type: 'enum', enum: CheckStatusTaskEnum })
  check_status: CheckStatusTaskEnum;

  @ManyToOne(() => DepartmentRlEnt, (department_rl) => department_rl.tasks)
  department_rl: DepartmentRlEnt;

  @ManyToOne(() => UserEnt, (user) => user.task)
  user: UserEnt;

  @OneToMany(
    () => TaskBlockOperationEnt,
    (task_block_operations) => task_block_operations.task,
  )
  task_block_operations: TaskBlockOperationEnt[];

  @OneToOne(() => RelTaskEnt, (last_rel_task) => last_rel_task.src)
  last_rel_task: RelTaskEnt;

  @OneToOne(() => RelTaskEnt, (new_rel_task) => new_rel_task.ref)
  new_rel_task: RelTaskEnt;
}
