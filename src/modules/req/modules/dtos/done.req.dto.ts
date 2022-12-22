import { ApiProperty } from '@nestjs/swagger';

export class DoneReqDto {
  @ApiProperty()
  limit: number;
}
