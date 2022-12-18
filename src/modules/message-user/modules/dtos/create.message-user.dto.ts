import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { MessageEnt } from 'src/modules/message/modules/entities/message.entity';

export class CreateMessageUserDto {
  @ApiProperty()
  publish_date: Date;

  @ApiHideProperty()
  user_id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  seen: number;

  @ApiHideProperty()
  message: MessageEnt;

  @ApiHideProperty()
  message_id: string;
}
