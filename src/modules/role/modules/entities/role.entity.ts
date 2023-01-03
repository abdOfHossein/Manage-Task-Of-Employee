import { BasicEnt } from 'src/common/entities/basic.entity';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleTypeEnum } from '../enum/role.enum';

@Entity({ name: 'role' })
export class RoleEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{ array: true, default:RoleTypeEnum.ADMIN})
  role_type: RoleTypeEnum[];

  @OneToMany(() => UserEnt, (users) => users.role)
  users: UserEnt[];
}
