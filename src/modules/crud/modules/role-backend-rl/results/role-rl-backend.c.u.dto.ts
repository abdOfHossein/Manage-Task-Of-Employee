import { ApiProperty } from "@nestjs/swagger";
import { RoleEnt } from "src/modules/role/modules/entities/role.entity"; 
import { BackendEnt } from "../../backend/entities/backend.entity";
import { RoleRlBackendEnt } from "../entities/role-rl-backend.entity";

export class RoleRlBackendCUDto{
    @ApiProperty()
    role: RoleEnt

    @ApiProperty()
    backend: BackendEnt

    constructor(init?: Partial<RoleRlBackendEnt> ){
        this.backend = init.backend;
        this.role = init.role
    }
}
