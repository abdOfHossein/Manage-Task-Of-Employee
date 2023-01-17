import { ApiProperty } from '@nestjs/swagger';

import { Allow } from "class-validator";
import { PageOptionsDto } from 'src/common/dtos/page.option.dto';
import { MenuFilterDto } from '../filter/menu.filter.dto';



export class MenuPageDto extends PageOptionsDto {
    @ApiProperty()
    @Allow()
    filter: MenuFilterDto;
}
