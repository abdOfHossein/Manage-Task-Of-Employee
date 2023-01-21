import { BasicEnt } from 'src/common/entities/basic.entity';
import { SchemaEntityEnum } from 'src/common/enums/schema.entity.enum';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: SchemaEntityEnum.TASK,name: 'Project' })
export class ProjectEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  project_name: string;

  @OneToMany(() => ReqEnt, (reqs) => reqs.project)
  reqs: ReqEnt[];

  @OneToOne(() => FileEnt, (file) => file.project)
  @JoinColumn({ name: 'fileId' })
  file: FileEnt;
}
