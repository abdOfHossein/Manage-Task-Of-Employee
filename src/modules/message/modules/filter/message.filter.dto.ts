import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { MessageTypeEnum } from '../enum/message.type.enum';
import { RecieveTypeMessageEnum } from '../enum/recieve.type.message.enum';

export class MessageFilterDto {
  @ApiProperty()
  @Allow()
  title: string;

  @ApiProperty()
  @Allow()
  content: string;

  @ApiProperty()
  @Allow()
  recieve_type: RecieveTypeMessageEnum;

  @ApiProperty()
  @Allow()
  message_type: MessageTypeEnum;

  @ApiProperty()
  @Allow()
  publish_date: Date;
}
