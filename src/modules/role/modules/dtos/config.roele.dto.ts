import { ApiProperty } from '@nestjs/swagger';
import { RoleTypeEnum } from '../enum/role.enum';

export class ConfigRoleDto {
  @ApiProperty({ default: RoleTypeEnum.USER })
  roles: string[];
}
