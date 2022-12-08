import { BasicEnt } from 'src/common/entities/basic.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TypePlatformEnum } from '../enum/type.platform.enum';

@Entity({ schema: 'public', name: 'frontend' })
export class FrontendEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  slug_name: string;

  @Column({
    type: 'enum',
    enum: TypePlatformEnum,
    default: TypePlatformEnum.WEB,
  })
  type_platform: TypePlatformEnum;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  host: string;

  @Column('text', { nullable: false })
  route: string;
}
