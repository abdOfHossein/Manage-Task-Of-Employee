import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { FrontendEnt } from '../../frontend/entities/frontend.entity';
import { MenuEnt } from '../entities/menu.entity';

export class CreateMenuDto {
  @ApiProperty()
  @Allow()
  @IsNotEmpty({ message: i18nValidationMessage('i18n.public.NOT_EMPTY') })
  slug_name: string;

  @IsNotEmpty()
  @ApiProperty()
  @Allow()
  base_order: number;

  @ApiProperty()
  @Allow()
  id_parent?: string;

  @ApiProperty()
  @Allow()
  id_front?: string;

  @IsNotEmpty()
  @ApiProperty()
  @Allow()
  id_role: string;

  @ApiHideProperty()
  frontend: FrontendEnt;

  @ApiHideProperty()
  parent?: MenuEnt;

  @ApiHideProperty()
  role: RoleEnt;
}
