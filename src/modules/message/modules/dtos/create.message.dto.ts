import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserEnt } from '../../../user/modules/entities/user.entity';
import { MessageTypeEnum } from '../enum/message.type.enum';
import { RecieveTypeMessageEnum } from '../enum/recieve.type.message.enum';

export class CreateMessageDto {
  @ApiProperty()
  to: string[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty({default:RecieveTypeMessageEnum.ALL})
  recieve_type: RecieveTypeMessageEnum;

  @ApiProperty({default:MessageTypeEnum.SUCCESS})
  message_type: MessageTypeEnum;

  @ApiProperty()
  publish_date: Date;

  @ApiHideProperty()
  id_user: string;

  @ApiHideProperty()
  users: UserEnt;
}
