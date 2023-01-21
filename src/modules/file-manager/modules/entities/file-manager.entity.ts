import { BasicEnt } from 'src/common/entities/basic.entity';
import { SchemaEntityEnum } from 'src/common/enums/schema.entity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RecieveTypeEnum } from '../enums/file-manager.enum';

@Entity({ schema: SchemaEntityEnum.PUBLIC,name: 'file_manager' })
export class FileManagerEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  destination_id: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  files: string[];

  @Column({
    type: 'enum',
    enum: RecieveTypeEnum,
    default: RecieveTypeEnum.PUBLIC,
  })
  reciverType: RecieveTypeEnum;
}
