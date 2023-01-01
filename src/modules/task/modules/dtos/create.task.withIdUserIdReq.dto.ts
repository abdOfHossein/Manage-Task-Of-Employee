import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserResponseJWTDto } from '../../../../common/dtos/user.dto';
import { DepartmentRlEnt } from '../../../department-rl/modules/entities/department-rl.entity';
import { DepartmentEnt } from '../../../department/modules/entities/department.entity';
import { ProjectEnt } from '../../../project/modules/entities/project.entity';
import { ReqEnt } from '../../../req/modules/entities/req.entity';
import { UserEnt } from '../../../user/modules/entities/user.entity';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';

export class CreateTaskWithIdUserIdReqDto {
  @ApiHideProperty()
  departmentRl: DepartmentRlEnt;

  @ApiHideProperty()
  userEnt?: UserEnt;

  @ApiProperty()
  priority: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  head_id: string;

  @ApiProperty()
  do_date: Date;
}
