import { ApiProperty } from '@nestjs/swagger';

export class SuccessResult {
  @ApiProperty()
  status: boolean;

  constructor(status: boolean) {
    this.status = status;
  }
}
