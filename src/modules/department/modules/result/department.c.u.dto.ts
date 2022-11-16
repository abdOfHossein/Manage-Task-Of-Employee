import { ApiProperty } from '@nestjs/swagger';
import { DepartmentEnt } from '../entities/department.entity';
export class DepartmentCUDto {
  @ApiProperty()
  id_department: string;

  @ApiProperty()
  header_id: string;

  @ApiProperty()
  name_department: string;

  constructor(init?: Partial<DepartmentEnt>) {
    this.id_department = init.id;
    this.header_id = init.header_id;
    this.name_department = init.name_department;
  }
}
