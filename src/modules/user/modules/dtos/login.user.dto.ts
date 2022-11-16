import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  username: string;
}
