import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdateBackendDto {
    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('i18n.public.NOT_EMPTY') })
    slug_name: string;

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('i18n.public.NOT_EMPTY') })
    route: string;

    @ApiProperty()
    method: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    query: string;
}