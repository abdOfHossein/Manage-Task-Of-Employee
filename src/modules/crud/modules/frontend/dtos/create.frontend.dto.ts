import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { i18nValidationMessage } from "nestjs-i18n"
import { TypePlatformEnum } from "../enum/type.platform.enum"

export class CreateFrontendDto {
    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('i18n.public.NOT_EMPTY') })
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