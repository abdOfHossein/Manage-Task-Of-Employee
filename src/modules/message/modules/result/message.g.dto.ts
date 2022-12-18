import { ApiProperty } from '@nestjs/swagger';
import { MessageEnt } from '../entities/message.entity';
import { MessageTypeEnum } from '../enum/message.type.enum';
import { RecieveTypeMessageEnum } from '../enum/recieve.type.message.enum';

export class MessageGDto {
  @ApiProperty()
  id_message: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  recieve_type: RecieveTypeMessageEnum;

  @ApiProperty()
  message_type: MessageTypeEnum;

  @ApiProperty()
  publish_date: Date;

  constructor(init?: Partial<MessageEnt>) {
    this.id_message = init.id;
    this.to = init.to;
    this.title = init.title;
    this.content = init.content;
    this.recieve_type = init.recieve_type;
    this.message_type = init.message_type;
    this.publish_date = init.publish_date;
  }
}
