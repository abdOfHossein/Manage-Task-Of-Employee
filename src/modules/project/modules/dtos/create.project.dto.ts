import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';

export class CreateProjectDto {
  @ApiProperty()
  project_name: string;

  @ApiHideProperty()
  unq_file:string

  @ApiHideProperty()
  file:FileEnt
}
