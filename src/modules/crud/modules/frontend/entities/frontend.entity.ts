import { BasicEnt } from 'src/common/entities/basic.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MenuEnt } from '../../menu/entities/menu.entity';
import { TypePlatformEnum } from '../enum/type.platform.enum';

@Entity({ name: 'frontend' })
export class FrontendEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  slug_name: string;

  @Column({
    type: 'enum',
    enum: TypePlatformEnum,
    default: TypePlatformEnum.WEB,
  })
  type_platform: TypePlatformEnum;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: false })
  host: string;

  @Column('text', { nullable: false, unique: true })
  route: string;

  @OneToMany(() => MenuEnt, (menu) => menu.frontend)
  menu: MenuEnt[];
}
