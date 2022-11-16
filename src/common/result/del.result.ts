import { ApiProperty } from '@nestjs/swagger';

export class DelResult {
  @ApiProperty()
  status: boolean;

  constructor(status: boolean) {
    this.status = status;
  }
}
