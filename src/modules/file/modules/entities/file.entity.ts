import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicEnt } from 'src/common/entities/basic.entity'; 
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';  
import { StatusFileEnum } from '../enums/status.file.enum';
import { TypeFileEnum } from '../enums/type.file.enum';
import { ProjectEnt } from 'src/modules/project/modules/entities/project.entity';
var randomstring = require('randomstring');

@Entity({ schema: 'public', name: 'file_manager' })
export class FileEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mime_type: string;

  @Column({ unique: true })
  unq_file: string;

  @Column()
  size: number;

  @Column()
  file: string;
  
  @Column()
  file_path: string;

  @Column({ nullable: true })
  original: string;

  @Column({ type: 'enum', enum: TypeFileEnum })
  type_file: TypeFileEnum;

  @Column({
    type: 'enum',
    enum: StatusFileEnum,
    default: StatusFileEnum.SUSPEND,
  })
  status: StatusFileEnum;

  @ManyToOne(() => UserEnt, (user) => user.files)
  user: UserEnt;

  @OneToOne(() =>ProjectEnt, (project) => project.file)
  project:ProjectEnt
  
  @BeforeInsert()
  fillInsert() {
    this.unq_file =
      randomstring.generate({
        length: 64,
        charset: '1234567890',
      }) +
      randomstring.generate({
        length: 64,
        charset: '1234567890',
      }) +
      Date.now();

    this.original =
      randomstring.generate({
        length: 32,
        charset: '1234567890',
      }) +
      randomstring.generate({
        length: 32,
        charset: '1234567890',
      }) +
      Date.now();
  }

  fillUpdate() {
    this.unq_file =
      randomstring.generate({
        length: 64,
        charset: '1234567890',
      }) +
      randomstring.generate({
        length: 64,
        charset: '1234567890',
      }) +
      Date.now();
  }
}
