import { BasicEnt } from 'src/common/entities/basic.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'backend' })
export class BackendEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  slug_name: string;

  @Column({ nullable: true })
  route: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  query: string;

  @Column({ nullable: true })
  body: string;
}
