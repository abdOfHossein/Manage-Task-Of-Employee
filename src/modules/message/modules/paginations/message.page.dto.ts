import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { MessageFilterDto } from '../filter/message.filter.dto';

export class MessagePageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: MessageFilterDto;
}
