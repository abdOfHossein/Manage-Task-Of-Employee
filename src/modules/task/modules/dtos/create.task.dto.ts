import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';

export class CreateTaskDto {
@ApiHideProperty()
  id_department_rl:string

  @ApiHideProperty()
  departmentRl:DepartmentRlEnt

  @ApiProperty()
  priority: string;

  @ApiProperty()
  tittle: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  head_id: string;

  @ApiProperty({ default: TypeTaskEnum.DOING })
  type: TypeTaskEnum;

  @ApiProperty({ default: StatusTaskEnum.NEWTASK })
  status: StatusTaskEnum;
}
