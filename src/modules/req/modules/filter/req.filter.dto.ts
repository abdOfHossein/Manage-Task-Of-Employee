import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { StatusReqEnum } from '../enums/req.enum';

export class ReqFilterDto {
  @ApiProperty({ default: StatusReqEnum.DONE })
  @Allow()
  status: StatusReqEnum;
}
