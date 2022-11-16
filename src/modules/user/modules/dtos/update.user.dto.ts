import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';

export class UpdateUserDto {
  @ApiHideProperty()
  departmentEnt: DepartmentEnt;

  @ApiProperty()
  id_department: string;

  @ApiHideProperty()
  roleEnt: RoleEnt;

  @ApiHideProperty()
  id_role: string;

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
}
