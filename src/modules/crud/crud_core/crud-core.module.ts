import { Module } from '@nestjs/common';
import { BackendModule } from '../modules/backend/backend.module';
import { FrontEndMenuModule } from '../modules/frontend-menu/frontend-menu.module';
import { FrontendModule } from '../modules/frontend/frontend.module';
import { MenuModule } from '../modules/menu/menu.module';
import { RoleRlBackendModule } from '../modules/role-backend-rl/role-rl-backend.module';
import { BackendController } from './controller/backend.controller';
import { FrontendController } from './controller/frontend.controller';
import { MenuController } from './controller/menu.controller';
import { RoleRlBackendController } from './controller/role-rl-backend.controller';

@Module({
  imports: [
    FrontendModule,
    BackendModule,
    MenuModule,
    RoleRlBackendModule,
    FrontEndMenuModule,
  ],
  controllers: [
    FrontendController,
    BackendController,
    MenuController,
    RoleRlBackendController,
  ],
})
export class CrudCoreModule {}
