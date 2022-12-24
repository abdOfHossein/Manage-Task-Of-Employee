import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordAdminDto {

  @ApiProperty()
  new_password: string;

}
