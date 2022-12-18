import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordAdmin {
  @ApiProperty()
  password: string;

}
