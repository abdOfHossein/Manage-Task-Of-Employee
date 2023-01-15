import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { TypePlatformEnum } from "../enum/type.platform.enum"

export class CreateFrontendDto {
    @ApiProperty()
    @IsNotEmpty()
    slug_name?: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    host?: string

    @ApiProperty()
    route: string

    @ApiProperty()
    type_platform: TypePlatformEnum
}