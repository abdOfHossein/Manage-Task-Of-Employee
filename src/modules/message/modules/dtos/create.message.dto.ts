import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { StatusMessageEnum } from '../enums/status-message.enum';
import { TypeMessageEnum } from '../enums/type-Message.enum';
import { ProjectEnt } from "../../../project/modules/entities/project.entity";
import { ReqEnt } from "../../../req/modules/entities/req.entity";
import { UserEnt } from "../../../user/modules/entities/user.entity";
import { UserResponseJWTDto } from "../../../../common/dtos/user.dto";
import { DepartmentEnt } from "../../../department/modules/entities/department.entity";
import { DepartmentRlEnt } from "../../../department-rl/modules/entities/department-rl.entity";

export class CreateMessageDto {
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
  id_user?: UserResponseJWTDto;

  @ApiHideProperty()
  userEnt?: UserEnt;

  @ApiHideProperty()
  projectEnt?: ProjectEnt;

  @ApiHideProperty()
  reqEnt?: ReqEnt;

  @ApiProperty({ default: TypeMessageEnum.DOING })
  type: TypeMessageEnum;

  @ApiProperty({ default: StatusMessageEnum.NEWMessage })
  status: StatusMessageEnum;
}
