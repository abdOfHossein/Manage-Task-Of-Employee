import { Injectable } from "@nestjs/common";
import { ParamResultEnum } from "src/common/enums/param.result.enum";
import { FrontendEnt } from "../../frontend/entities/frontend.entity";
import { FrontendService } from "../../frontend/services/frontend.service";
import { MenuService } from "../../menu/services/menu.service";


@Injectable()
export class FrontendMenuService {
    constructor(private menuService: MenuService,
                private frontendService: FrontendService){}


    async delete(frontend_id: string){
        const frontEnt=await this.frontendService._getOne(frontend_id)
        console.log('frontend =>>>>>>>>',frontEnt);
        console.log('menu id =>>>>>>>>>>>>', frontEnt.menu);
        // const menuent=await this.menuService.getOne(frontEnt.menu,ParamResultEnum.Entity)
        // console.log('menuent =>>>>>>>>',menuent);
        await this.menuService.deleteMany(frontEnt.menu)
        await this.frontendService._delete(frontEnt.id)
    }
}