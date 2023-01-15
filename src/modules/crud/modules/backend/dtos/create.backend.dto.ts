import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateBackendDto {
    @ApiProperty()
    @IsNotEmpty()
    slug_name: string;

    @ApiProperty()
    @IsNotEmpty()
    route: string;

    @ApiProperty()
    method: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    query: string;
}