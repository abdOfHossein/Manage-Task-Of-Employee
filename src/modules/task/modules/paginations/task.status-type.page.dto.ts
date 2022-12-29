import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { TaskTypeStatusFilterDto } from '../filter/task.status-type.filter.dto';

export class TaskTypeStatusPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: TaskTypeStatusFilterDto;
}
