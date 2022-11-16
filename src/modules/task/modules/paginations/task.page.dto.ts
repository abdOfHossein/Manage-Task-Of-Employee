import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { TaskFilterDto } from '../filter/task.filter.dto';

export class TaskPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: TaskFilterDto;
}
