import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { ReportTaskFilterDto } from '../filter/report.task.filter.dto';
import { TaskFilterDto } from '../filter/task.filter.dto';

export class ReportTaskPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: ReportTaskFilterDto;
}
