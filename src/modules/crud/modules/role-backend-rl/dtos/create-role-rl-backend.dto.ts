import { ApiHideProperty, ApiProperty } from "@nestjs/swagger"
import { RoleEnt } from "src/modules/role/modules/entities/role.entity" 
import { BackendEnt } from "../../backend/entities/backend.entity"

export class CreateRoleRlBackendDto {
    @ApiHideProperty()
    role: RoleEnt

    @ApiHideProperty()
    backend: BackendEnt

    @ApiProperty()
    id_role: string

    @ApiProperty()
    id_backend: string
}