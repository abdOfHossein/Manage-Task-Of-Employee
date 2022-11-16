import { ApiHideProperty } from '@nestjs/swagger';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';

export class CreateDepartmentRlDto {
  @ApiHideProperty()
  reqEnt: ReqEnt;

  @ApiHideProperty()
  req_id: string;

  @ApiHideProperty()
  departmentEnt: DepartmentEnt;

  @ApiHideProperty()
  department_id: string;
}
