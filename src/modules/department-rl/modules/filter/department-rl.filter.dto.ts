import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class DepartmentRlFilterDto {
  @ApiProperty()
  @Allow()
  name_department: string;
}
