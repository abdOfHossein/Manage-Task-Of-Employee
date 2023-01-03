import { BasicEnt } from 'src/common/entities/basic.entity';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'department' })
export class DepartmentEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  header_id: string;

  @Column({ unique: true, nullable: true })
  name_department: string;

  @OneToMany(() => UserEnt, (users) => users.department)
  users: UserEnt[];

  @OneToMany(
    () => DepartmentRlEnt,
    (department_rls) => department_rls.department,
  )
  department_rls: DepartmentRlEnt[];
}
