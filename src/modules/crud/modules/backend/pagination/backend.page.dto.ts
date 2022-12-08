import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { PageOptionsDto } from "src/common/dtos/page.option.dto";
import { BackEndFilterDto } from "../filter/backend.filter.dto";

export class BackendPageDto extends PageOptionsDto {
    @ApiProperty()
    @Allow()
    filter: BackEndFilterDto;
}