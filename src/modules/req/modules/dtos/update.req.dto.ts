import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ProjectEnt } from 'src/modules/project/modules/entities/project.entity';
import { StatusReqEnum } from '../enums/req.enum';

export class UpdateReqDto {
  @ApiProperty({ default: StatusReqEnum.OPEN })
  status: StatusReqEnum;

  @ApiProperty()
  name: string;

  @ApiProperty()
  id_department: string[];

  @ApiProperty()
  description: string;
  
  @ApiHideProperty()
  project_id: string;

  @ApiHideProperty()
  projectEnt: ProjectEnt;
}
