import { BasicEnt } from 'src/common/entities/basic.entity';
import { SchemaEntityEnum } from 'src/common/enums/schema.entity.enum';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: SchemaEntityEnum.TASK, name: 'TaskBlockOperation' })
export class TaskBlockOperationEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name_task_block_operation: string;

  @Column({ nullable: true })
  desription_task_block_operation: string;

  @ManyToOne(() => TaskEnt, (task) => task.task_block_operations)
  task: TaskEnt;
}
