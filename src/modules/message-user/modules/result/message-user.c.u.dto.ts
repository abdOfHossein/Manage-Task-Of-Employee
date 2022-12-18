import { ApiProperty } from '@nestjs/swagger';
import { MessageUserEnt } from '../entities/message-user.entity';
export class MessageUserCUDto {
  @ApiProperty()
  id_message: string;

  @ApiProperty()
  publish_date: Date;

  @ApiProperty()
  content: string;

  @ApiProperty()
  seen: number;

  constructor(init?: Partial<MessageUserEnt>) {
    this.id_message = init.id;
    this.publish_date = init.publish_date;
    this.seen = init.seen;
  }
}
