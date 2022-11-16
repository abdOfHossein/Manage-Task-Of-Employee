import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class UserFilterDto {
  @ApiProperty()
  @Allow()
  first_name: string;

  @ApiProperty()
  @Allow()
  last_name: string;

  @ApiProperty()
  @Allow()
  username: string;
}
