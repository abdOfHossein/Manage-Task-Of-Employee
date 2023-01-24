import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateDepartmentDto {

  @ApiProperty()
  @IsUUID()
  header_id: string;

  @ApiProperty()
  name_department: string;
}
