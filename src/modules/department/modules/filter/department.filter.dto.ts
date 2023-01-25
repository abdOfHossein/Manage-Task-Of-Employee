import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class DepartmentFilterDto {
  @ApiProperty()
  @Allow()
  header_id: string;
}
