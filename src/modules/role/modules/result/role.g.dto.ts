import { ApiProperty } from '@nestjs/swagger';
import { RoleEnt } from '../entities/role.entity';
import { RoleTypeEnum } from '../enum/role.enum';

export class RoleGDto {
  @ApiProperty()
  id_role: string;

  @ApiProperty()
  role_type: string;

  constructor(init?: Partial<RoleEnt>) {
    this.id_role = init.id;
    this.role_type = init.role_type;
  }
}
