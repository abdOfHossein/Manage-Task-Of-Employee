import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { RoleRepo } from 'src/modules/role/modules/repositories/role.repository';
import { RoleService } from 'src/modules/role/modules/services/role.service';
import { HandlerModule } from 'src/utility/handler/handler.module';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { FrontendModule } from '../frontend/frontend.module';
import { MenuEnt } from './entities/menu.entity';
import { MenuRepo } from './repositories/menu.repository';
import { MenuService } from './services/menu.service';

@Module({
  imports: [
    HandlerModule,
    FrontendModule,
    TypeOrmModule.forFeature([MenuEnt, RoleEnt]),
  ],
  providers: [
    MenuService,
    MenuRepo,
    RoleService,
    RoleRepo,
    HandlerService,
    TranslateService,
  ],
  exports: [MenuService],
})
export class MenuModule {}
