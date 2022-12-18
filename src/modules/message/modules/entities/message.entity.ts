import { BasicEnt } from 'src/common/entities/basic.entity';
import { MessageUserEnt } from 'src/modules/message-user/modules/entities/message-user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEnt } from '../../../user/modules/entities/user.entity';
import { MessageTypeEnum } from '../enum/message.type.enum';
import { RecieveTypeMessageEnum } from '../enum/recieve.type.message.enum';

@Entity({ name: 'message' })
export class MessageEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{ array: true, nullable: true })
  to: string[];

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  recieve_type: RecieveTypeMessageEnum;

  @Column({ nullable: true })
  message_type: MessageTypeEnum;

  @Column({ nullable: true })
  publish_date: Date;

  @ManyToOne(() => UserEnt, (user) => user.messages)
  user: UserEnt;

  @OneToMany(() => MessageUserEnt, (messages_user) => messages_user.message)
  messages_user: MessageUserEnt[];
}
