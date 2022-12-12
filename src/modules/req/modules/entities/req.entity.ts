import { BasicEnt } from 'src/common/entities/basic.entity';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { ProjectEnt } from 'src/modules/project/modules/entities/project.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusReqEnum } from '../enums/req.enum';

@Entity({ name: 'Req' })
export class ReqEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: StatusReqEnum;

  @Column({ default: true })
  isDefault: boolean;

  @ManyToOne(() => ProjectEnt, (project) => project.reqs)
  project: ProjectEnt;

  @OneToMany(() => DepartmentRlEnt, (department_rls) => department_rls.req)
  department_rls: DepartmentRlEnt[];
  
}
