
import { ApiProperty } from '@nestjs/swagger';

import { Allow } from "class-validator";
import { PageOptionsDto } from 'src/common/dtos/page.option.dto';
import { RoleRlBackendFilterDto } from '../filter/role-rl-backend.filter.dto';

export class RoleRlBackendPageDto extends PageOptionsDto {
    @ApiProperty()
    @Allow()
    filter: RoleRlBackendFilterDto;
}
