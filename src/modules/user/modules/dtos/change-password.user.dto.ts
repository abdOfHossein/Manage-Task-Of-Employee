import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordUserDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  confirm_password: string;

  @ApiProperty()
  new_password: string;
}
