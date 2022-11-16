import { BasicEnt } from 'src/common/entities/basic.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Project' })
export class ProjectEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  project_name: string;

  @OneToMany(() => ReqEnt, (reqs) => reqs.project)
  reqs: ReqEnt[];
}
