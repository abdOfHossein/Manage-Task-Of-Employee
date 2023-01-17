import { BasicEnt } from 'src/common/entities/basic.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity'; 
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { FrontendEnt } from '../../frontend/entities/frontend.entity';

@Entity({ name: 'menu' })
@Tree('closure-table', {
  ancestorColumnName: (column) => 'ancestor_' + column.propertyName,
  descendantColumnName: (column) => 'descendant_' + column.propertyName,
})
export class MenuEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  slug_name: string;

  @Column({ nullable: false })
  base_order: number;

  @TreeChildren()
  children: MenuEnt[];

  @TreeParent()
  parent: MenuEnt;

  @ManyToOne(() => FrontendEnt, (front) => front.menu)
  frontend: FrontendEnt;

  @ManyToOne(() => RoleEnt, (role) => role.menu)
  role: RoleEnt;
}
