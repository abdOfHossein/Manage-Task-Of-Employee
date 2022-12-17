import { BasicEnt } from 'src/common/entities/basic.entity';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEnt } from '../../../user/modules/entities/user.entity';
import { StatusTaskEnum } from '../enums/status-message.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';

@Entity({ name: 'task' })
export class MessageEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  to: string;

  @Column({ nullable: true })
  tittle: string;

  @Column({ nullable: true })
  head_id: string;

  @Column({ nullable: true })
  type: TypeTaskEnum;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  status: StatusTaskEnum;

  @ManyToOne(() => UserEnt, (user) => user.messages)
  users: UserEnt;
}
