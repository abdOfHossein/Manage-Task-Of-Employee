import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { DepartmentRlEnt } from '../entities/department-rl.entity';
export class DepartmentRlCUDto {
  @ApiProperty()
  id_department_rl: string;

  @ApiHideProperty()
  reqEnt: ReqEnt;

  @ApiHideProperty()
  req_id: string;

  @ApiHideProperty()
  departmentEnt: DepartmentEnt;

  @ApiHideProperty()
  department_id: string;

  constructor(init?: Partial<DepartmentRlEnt>) {
    this.id_department_rl = init.id;
    this.reqEnt = init.req;
    this.departmentEnt = init.department;
  }
}
