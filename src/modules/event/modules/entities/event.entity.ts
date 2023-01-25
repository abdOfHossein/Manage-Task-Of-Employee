import { BasicEnt } from 'src/common/entities/basic.entity';
import { SchemaEntityEnum } from 'src/common/enums/schema.entity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PriorityEventEnum } from '../enums/priority-event.enum';

@Entity({ schema: SchemaEntityEnum.PUBLIC, name: 'event' })
export class EventEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: PriorityEventEnum, type: 'enum', nullable: true })
  priority: PriorityEventEnum;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  title: string;
}
