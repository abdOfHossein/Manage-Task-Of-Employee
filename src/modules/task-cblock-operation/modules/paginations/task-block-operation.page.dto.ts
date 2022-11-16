import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { TaskBlockOperationFilterDto } from '../filter/task-block-operation.filter.dto';

export class TaskBlockOperationPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: TaskBlockOperationFilterDto;
}
