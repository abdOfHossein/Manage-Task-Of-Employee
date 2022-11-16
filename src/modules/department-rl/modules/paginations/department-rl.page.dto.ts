import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { DepartmentRlFilterDto } from '../filter/department-rl.filter.dto';

export class DepartmentRlPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: DepartmentRlFilterDto;
}
