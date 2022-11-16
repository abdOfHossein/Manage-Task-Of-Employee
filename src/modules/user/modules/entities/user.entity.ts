import { BasicEnt } from 'src/common/entities/basic.entity';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phonenumber: string;

  @ManyToOne(() => DepartmentEnt, (department) => department.users)
  department: DepartmentEnt;

  @ManyToOne(() => RoleEnt, (role) => role.users)
  role: RoleEnt;
}
