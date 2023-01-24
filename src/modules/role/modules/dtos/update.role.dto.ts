import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiHideProperty()
  id_role: string;

  @ApiProperty()
  role_type: string;
}
