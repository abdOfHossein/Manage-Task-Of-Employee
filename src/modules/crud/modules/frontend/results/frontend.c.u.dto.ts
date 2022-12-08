import { ApiProperty } from "@nestjs/swagger"
import { FrontendEnt } from "../entities/frontend.entity"
import { TypePlatformEnum } from "../enum/type.platform.enum"

export class FrontendCUDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    slug_name?: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    host?: string

    @ApiProperty()
    route: string

    
    @ApiProperty()
    type_platform: TypePlatformEnum
    
    constructor(init?: Partial<FrontendEnt>) {
        this.id = init.id
        this.slug_name = init.slug_name
        this.description = init.description
        this.host = init.host
        this.route = init.route
        this.type_platform = init.type_platform
    }
}