import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';

export class CreateUserDto {
  @ApiHideProperty()
  unq_file:string;

  @ApiHideProperty()
  file:FileEnt;

  @ApiHideProperty()
  departmentEnt: DepartmentEnt;

  @ApiHideProperty()
  id_department: string;

  @ApiProperty({default:true})
  role_default_status: boolean;

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
