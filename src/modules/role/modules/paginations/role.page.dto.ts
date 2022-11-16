import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { RoleFilterDto } from '../filter/role.filter.dto';

export class RolePageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: RoleFilterDto;
}
