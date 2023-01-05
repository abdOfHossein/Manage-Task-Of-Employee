import { BasicEnt } from 'src/common/entities/basic.entity';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleTypeEnum } from '../enum/role.enum';

@Entity({ name: 'role' })
export class RoleEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: RoleTypeEnum.ADMIN ,type:"enum",enum:RoleTypeEnum} )
  role_type: RoleTypeEnum;

  @ManyToMany(() => UserEnt, (users) => users.role)
  @JoinTable()
  users: UserEnt[];
}
