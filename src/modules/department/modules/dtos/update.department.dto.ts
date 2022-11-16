import { ApiProperty } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @ApiProperty()
  header_id: string;

  @ApiProperty()
  name_department: string;
}
