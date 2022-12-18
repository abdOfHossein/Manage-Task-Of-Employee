import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { MessageUserFilterDto } from '../filter/message-user.filter.dto';

export class MessageUserPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: MessageUserFilterDto;
}
