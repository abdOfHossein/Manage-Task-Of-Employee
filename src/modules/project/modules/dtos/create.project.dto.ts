import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  project_name: string;
}
