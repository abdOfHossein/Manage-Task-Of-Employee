import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty()
  header_id: string;

  @ApiProperty()
  name_department: string;
}
