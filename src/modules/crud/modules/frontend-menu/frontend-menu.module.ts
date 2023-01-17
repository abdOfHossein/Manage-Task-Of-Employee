import { Module } from '@nestjs/common';
import { FrontendModule } from '../frontend/frontend.module';
import { MenuModule } from '../menu/menu.module';
import { FrontendMenuService } from './service/frontend-menu.service';

@Module({
    imports:[
        MenuModule,
        FrontendModule
    ],
    providers: [FrontendMenuService],
    exports: [FrontendMenuService],
})
export class FrontEndMenuModule {}
