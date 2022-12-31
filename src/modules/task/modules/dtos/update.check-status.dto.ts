import { ApiProperty } from '@nestjs/swagger';
import { CheckStatusTaskEnum } from '../enums/check-status.enum';

export class UpdateCheckStatusTaskDto {
  @ApiProperty({ default: CheckStatusTaskEnum.DONE })
  check_status: CheckStatusTaskEnum;
}
