import { ApiProperty } from '@nestjs/swagger';

export class SuccessDto {
  @ApiProperty()
  status: boolean;

  constructor(init: boolean) {
    this.status = init;
  }
}
