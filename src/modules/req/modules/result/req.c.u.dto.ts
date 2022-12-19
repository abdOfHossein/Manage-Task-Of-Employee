import { ApiProperty } from '@nestjs/swagger';
import { ReqEnt } from '../entities/req.entity';
import { StatusReqEnum } from '../enums/req.enum';
export class ReqCUDto {
  @ApiProperty()
  id_Req: string;

  @ApiProperty()
  status: StatusReqEnum;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
  constructor(init?: Partial<ReqEnt>) {
    this.id_Req = init.id;
    this.status = init.status;
    this.name = init.name;
    this.description = init.description;
  }
}
