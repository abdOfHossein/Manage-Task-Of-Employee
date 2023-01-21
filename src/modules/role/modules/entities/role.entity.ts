import { BasicEnt } from 'src/common/entities/basic.entity';
import { SchemaEntityEnum } from 'src/common/enums/schema.entity.enum';
import { MenuEnt } from 'src/modules/crud/modules/menu/entities/menu.entity';
import { RoleRlBackendEnt } from 'src/modules/crud/modules/role-backend-rl/entities/role-rl-backend.entity';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: SchemaEntityEnum.AUTH,name: 'role' })
export class RoleEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  role_type: string;

  @Column({ nullable: false, default: true })
  role_default_status: boolean;

  @ManyToMany(() => UserEnt, (users) => users.role)
  @JoinTable()
  users: UserEnt[];

  @ManyToOne(() => MenuEnt, (menu) => menu.role)
  menu: MenuEnt;

  @OneToMany(() => RoleRlBackendEnt, (role_user) => role_user.role)
  role_backend: RoleRlBackendEnt[];
}
