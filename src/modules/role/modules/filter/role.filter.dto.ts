import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { RoleTypeEnum } from '../enum/role.enum';

export class RoleFilterDto {
  @ApiProperty()
  @Allow()
  role_type: string;
}
