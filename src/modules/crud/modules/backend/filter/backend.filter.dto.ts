import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class BackEndFilterDto {
    @ApiProperty()
    @Allow()
    route: string
    
    @ApiProperty()
    @Allow()
    method: string

    @ApiProperty()
    @Allow()
    query: string

    @ApiProperty()
    @Allow()
    body: string

    @ApiProperty()
    @Allow()
    slug_name: string

}