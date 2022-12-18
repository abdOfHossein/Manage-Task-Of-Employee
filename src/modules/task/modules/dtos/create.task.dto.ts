import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';
import { ProjectEnt } from "../../../project/modules/entities/project.entity";
import { ReqEnt } from "../../../req/modules/entities/req.entity";
import { UserEnt } from "../../../user/modules/entities/user.entity";
import { UserResponseJWTDto } from "../../../../common/dtos/user.dto";
import { DepartmentEnt } from "../../../department/modules/entities/department.entity";
import { DepartmentRlEnt } from "../../../department-rl/modules/entities/department-rl.entity";

export class CreateTaskDto {
  @ApiProperty()
  priority: string;

  @ApiProperty()
  tittle: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  head_id: string;

  @ApiHideProperty()
  id_project?: string;

  @ApiHideProperty()
  id_req?: string;

  @ApiHideProperty()
  id_department?: string;

  @ApiHideProperty()
  departmentEnt: DepartmentEnt;

  @ApiHideProperty()
  departmentRlEnt: DepartmentRlEnt;

  @ApiHideProperty()
  id_department_rl: string;

  @ApiHideProperty()
  id_user?: UserResponseJWTDto | any;

  @ApiHideProperty()
  userEnt?: UserEnt;

  @ApiHideProperty()
  projectEnt?: ProjectEnt;

  @ApiHideProperty()
  reqEnt?: ReqEnt;

  @ApiProperty({ default: TypeTaskEnum.DOING })
  type: TypeTaskEnum;

  @ApiProperty({ default: StatusTaskEnum.NEWTASK })
  status: StatusTaskEnum;
}
