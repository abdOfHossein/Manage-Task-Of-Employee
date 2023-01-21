import { BasicEnt } from 'src/common/entities/basic.entity';
import { SchemaEntityEnum } from 'src/common/enums/schema.entity.enum';
import { MessageEnt } from 'src/modules/message/modules/entities/message.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: SchemaEntityEnum.MESSAGE, name: 'message_user' })
export class MessageUserEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  publish_date: Date;

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: true, default: 0 })
  seen: number;

  @ManyToOne(() => MessageEnt, (message) => message.messages_user)
  message: MessageEnt;
}
