import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { RoleEnt } from "src/modules/role/modules/entities/role.entity"; 
import { FrontendEnt } from "../../frontend/entities/frontend.entity";
import { MenuEnt } from "../entities/menu.entity";

export class MenuCUDto {

    @ApiProperty()
    @Allow()
    slug_name: string;

    @ApiProperty()
    @Allow()
    base_order: number;

    @ApiProperty()
    @Allow()
    id_parent?: string;

    @ApiProperty()
    @Allow()
    id_front: string;


    @ApiProperty()
    @Allow()
    id_role: string;

    @ApiHideProperty()
    front: FrontendEnt;

    @ApiHideProperty()
    parent?: MenuEnt;

    @ApiHideProperty()
    role: RoleEnt;

    constructor(init?: Partial<MenuEnt> ){
        this.slug_name = init.slug_name;
        this.base_order = init.base_order;
    }
}