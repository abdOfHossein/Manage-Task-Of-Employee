import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserResponseJWTDto } from '../../../../common/dtos/user.dto';
import { DepartmentRlEnt } from '../../../department-rl/modules/entities/department-rl.entity';
import { DepartmentEnt } from '../../../department/modules/entities/department.entity';
import { ProjectEnt } from '../../../project/modules/entities/project.entity';
import { ReqEnt } from '../../../req/modules/entities/req.entity';
import { UserEnt } from '../../../user/modules/entities/user.entity';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';

export class CreateTaskDto {
  @ApiHideProperty()
  id_department_rl: string;

  @ApiHideProperty()
  departmentRl: DepartmentRlEnt;

  @ApiProperty()
  priority: string;

  @ApiProperty()
  title: string;

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
  id_user?: UserResponseJWTDto | any;

  @ApiHideProperty()
  userEnt?: UserEnt;

  @ApiHideProperty()
  projectEnt?: ProjectEnt;

  @ApiHideProperty()
  reqEnt?: ReqEnt;

  @ApiProperty({ default: TypeTaskEnum.NEWTASK })
  type: TypeTaskEnum;
  
  @ApiProperty()
  do_date:Date

  @ApiProperty()
  remain_date:Date

  @ApiProperty({ default: StatusTaskEnum.DOING })
  status: StatusTaskEnum;
}
