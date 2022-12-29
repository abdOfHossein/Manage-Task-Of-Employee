import { ApiProperty } from '@nestjs/swagger';
import { StatusTaskEnum } from '../enums/status-task.enum';

export class UpdateStatusTaskDto {
  @ApiProperty({ default: StatusTaskEnum.DOING })
  status: StatusTaskEnum;
}
