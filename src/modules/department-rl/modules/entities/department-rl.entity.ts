import { BasicEnt } from 'src/common/entities/basic.entity';
import { SchemaEntityEnum } from 'src/common/enums/schema.entity.enum';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: SchemaEntityEnum.TASK, name: 'DepartmentRl' })
export class DepartmentRlEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => TaskEnt, (tasks) => tasks.department_rl)
  tasks: TaskEnt[];

  @ManyToOne(() => ReqEnt, (req) => req.department_rls)
  req: ReqEnt;

  @ManyToOne(() => DepartmentEnt, (department) => department.department_rls)
  department: DepartmentEnt;
}
