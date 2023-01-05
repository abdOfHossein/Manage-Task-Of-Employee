import { ApiProperty } from '@nestjs/swagger';
import { RoleTypeEnum } from '../enum/role.enum';

export class ConfigRoleDto {
  @ApiProperty()
  id_roles: string[];
}
