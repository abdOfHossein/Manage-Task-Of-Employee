import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class FindRoleDto {
  @ApiProperty()
  @Allow()
  id_role : string
}