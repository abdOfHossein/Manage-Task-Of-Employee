import { ApiProperty } from '@nestjs/swagger';
import { UserEnt } from '../entities/User.entity';

export class UserGDto {
  @ApiProperty()
  id_user: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phonenumber: string;

  constructor(init?: Partial<UserEnt>) {
    this.id_user = init.id;
    this.first_name = init.first_name;
    this.last_name = init.last_name;
    this.username = init.username;
    this.password = init.password;
    this.email = init.email;
    this.phonenumber = init.phonenumber;
  }
}
