import { ApiProperty } from '@nestjs/swagger';

export class CalenderDto {
  @ApiProperty()
  first_time: string;

  @ApiProperty()
  second_time: string;
}
