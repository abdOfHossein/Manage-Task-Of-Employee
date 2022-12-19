import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ProjectEnt } from 'src/modules/project/modules/entities/project.entity';
import { StatusReqEnum } from '../enums/req.enum';

export class CreateReqDto {
  @ApiProperty()
  id_departments: Array<any | string>;

  @ApiProperty({ default: StatusReqEnum.OPEN })
  status: StatusReqEnum;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiHideProperty()
  project_id: string;

  @ApiHideProperty()
  projectEnt: ProjectEnt;
}
