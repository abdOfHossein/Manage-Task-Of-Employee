import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { UserFilterDto } from '../filter/user.filter.dto';

export class UserPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: UserFilterDto;
}
