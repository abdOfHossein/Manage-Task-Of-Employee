import { ApiProperty } from "@nestjs/swagger"
import { BackendEnt } from "../entities/backend.entity"

export class BackendGDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    slug_name: string;

    @ApiProperty()
    route: string;

    @ApiProperty()
    method: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    query: string;
    
    constructor(init?: Partial<BackendEnt>) {
        this.id = init.id
        this.slug_name = init.slug_name
        this.route = init.route
        this.method = init.method
        this.query = init.query
        this.body = init.body
    }
}