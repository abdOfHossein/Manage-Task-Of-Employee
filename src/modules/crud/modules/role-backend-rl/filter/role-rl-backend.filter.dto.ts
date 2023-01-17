import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class RoleRlBackendFilterDto {
  @ApiProperty()
  @Allow()
  id: string;
}
