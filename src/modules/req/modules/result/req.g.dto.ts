import { ApiProperty } from '@nestjs/swagger';
import { ReqEnt } from '../entities/req.entity';
import { StatusReqEnum } from '../enums/req.enum';

export class ReqGDto {
  @ApiProperty()
  id_Req: string;

  @ApiProperty()
  status: StatusReqEnum;

  constructor(init?: Partial<ReqEnt>) {
    this.id_Req = init.id;
    this.status = init.status;
  }
}
