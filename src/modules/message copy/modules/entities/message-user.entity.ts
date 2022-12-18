import { BasicEnt } from 'src/common/entities/basic.entity';
import { MessageEnt } from 'src/modules/message/modules/entities/message.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'message_user' })
export class MessageUserEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  publish_date: Date;

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  seen: number;

  @ManyToOne(() => MessageEnt, (message) => message.messages_user)
  message: MessageEnt;
}
