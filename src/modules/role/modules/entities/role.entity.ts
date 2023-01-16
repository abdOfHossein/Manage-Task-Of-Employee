import { BasicEnt } from 'src/common/entities/basic.entity';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'role' })
export class RoleEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable:true})
  role_type: string;

  @Column({ nullable: false, default: true })
  role_default_status: boolean;

  @ManyToMany(() => UserEnt, (users) => users.role)
  @JoinTable()
  users: UserEnt[];
}
