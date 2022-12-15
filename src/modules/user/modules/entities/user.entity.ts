import { BasicEnt } from 'src/common/entities/basic.entity';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { UserStatus } from "../enum/user.status";
import { sha512 } from "js-sha512";

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

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  phonenumber: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE})
  status: UserStatus;

  @ManyToOne(() => DepartmentEnt, (department) => department.users)
  department: DepartmentEnt;

  @ManyToOne(() => RoleEnt, (role) => role.users)
  role: RoleEnt;

  @Column({ nullable: true, default: true })
  role_default_status: boolean;

  @OneToMany(() => FileEnt, (files) => files.user)
  files: FileEnt[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = sha512(this.password);
    }
  }
  async validatePassword(password: string) {
    return this.password === sha512(password);
  }
}
