import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { ProjectFilterDto } from '../filter/project.filter.dto';

export class ProjectPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: ProjectFilterDto;
}
