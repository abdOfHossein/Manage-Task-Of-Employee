import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';

export class CreateUserDto {
  @ApiProperty()
  unq_file?:string;

  @IsNotEmpty()
  @ApiHideProperty()
  file: FileEnt;

  @IsNotEmpty()
  @ApiHideProperty()
  departmentEnt: DepartmentEnt;

  @IsNotEmpty()
  @ApiHideProperty()
  id_department: string;

  @IsNotEmpty()
  @ApiProperty({ default: true })
  role_default_status: boolean;

  @IsNotEmpty()
  @ApiHideProperty()
  roleEnt: RoleEnt[];

  @IsNotEmpty()
  @ApiProperty()
  id_role: string[];

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
