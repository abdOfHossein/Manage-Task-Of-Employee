import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class ProjectFilterDto {
  @ApiProperty()
  @Allow()
  project_name: string;
}
