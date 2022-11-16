import { ApiProperty } from '@nestjs/swagger';
import { ProjectEnt } from '../entities/project.entity';
export class ProjectCUDto {
  @ApiProperty()
  id_project: string;

  @ApiProperty()
  project_name: string;

  constructor(init?: Partial<ProjectEnt>) {
    this.id_project = init.id;
    this.project_name = init.project_name;
  }
}
