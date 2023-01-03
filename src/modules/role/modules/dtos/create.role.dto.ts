import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { RoleTypeEnum } from '../enum/role.enum';

export class CreateRoleDto {
  @ApiProperty({ default: RoleTypeEnum.USER })
    role_type: RoleTypeEnum[];;
}
