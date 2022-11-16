import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { DepartmentFilterDto } from '../filter/user.filter.dto';

export class DepartmentPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: DepartmentFilterDto;
}
