import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { MessageTypeEnum } from '../enum/message.type.enum';
import { RecieveTypeMessageEnum } from '../enum/recieve.type.message.enum';

export class UpdateMessageDto {
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

  @ApiHideProperty()
  id_user: string;

  @ApiHideProperty()
  users: UserEnt;
}
