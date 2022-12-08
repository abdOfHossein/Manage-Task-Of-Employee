import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class FrontendFilterDto {
    @ApiProperty()
    @Allow()
    slug_name?: string
    
    @ApiProperty()
    @Allow()
    host?: string

    @ApiProperty()
    @Allow()
    route?: string
}