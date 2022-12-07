import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";


export class FindFileDto {
    @ApiProperty()
    @Allow()
    id_file: string
}