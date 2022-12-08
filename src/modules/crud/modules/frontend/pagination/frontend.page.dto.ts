import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { PageOptionsDto } from "src/common/dtos/page.option.dto";
import { FrontendFilterDto } from "../filter/frontend.filter.dto";

export class FrontendPageDto extends PageOptionsDto {
    @ApiProperty()
    @Allow()
    filter: FrontendFilterDto;
}