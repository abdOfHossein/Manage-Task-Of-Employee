import { ApiProperty } from '@nestjs/swagger';
import { Allow } from "class-validator";

export class MenuFilterDto {

    @ApiProperty()
    @Allow()
    slug_name: string;

    @ApiProperty()
    @Allow()
    base_order: number;

    @ApiProperty()
    @Allow()
    parent: string;

    @ApiProperty()
    @Allow()
    id_role: string;

}
