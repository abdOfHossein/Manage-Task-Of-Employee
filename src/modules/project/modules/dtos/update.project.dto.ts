import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty()
  project_name: string;
}
