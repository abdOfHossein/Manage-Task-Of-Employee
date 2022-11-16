import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ProjectEnt } from 'src/modules/project/modules/entities/project.entity';
import { StatusReqEnum } from '../enums/req.enum';

export class CreateReqDto {
  @ApiProperty({ default: StatusReqEnum.OPEN })
  status: StatusReqEnum;

  @ApiHideProperty()
  project_id: string;

  @ApiHideProperty()
  projectEnt: ProjectEnt;
}
