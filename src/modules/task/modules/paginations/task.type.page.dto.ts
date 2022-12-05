import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { TaskTypeFilterDto } from '../filter/task.type.filter.dto';

export class TaskTypePageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: TaskTypeFilterDto;
}
