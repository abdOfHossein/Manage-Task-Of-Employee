import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, IsUUID } from 'class-validator';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { FrontendEnt } from '../../frontend/entities/frontend.entity';
import { MenuEnt } from '../entities/menu.entity';

export class UpdateMenuDto {
  @ApiProperty()
  @Allow()
  @IsNotEmpty()
  slug_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Allow()
  base_order: number;

  @ApiProperty()
  @Allow()
  id_parent?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  @Allow()
  id_front: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  @Allow()
  id_role: string;

  @ApiHideProperty()
  frontend: FrontendEnt;

  @ApiHideProperty()
  parent?: MenuEnt;

  @ApiHideProperty()
  role: RoleEnt;
}
