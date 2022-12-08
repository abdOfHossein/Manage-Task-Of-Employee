import { Module } from '@nestjs/common';
import { BackendModule } from '../modules/backend/backend.module';
import { FrontendModule } from '../modules/frontend/frontend.module';
import { BackendController } from './controller/backend.controller';
import { FrontendController } from './controller/frontend.controller';

@Module({
  imports: [FrontendModule, BackendModule],
  controllers: [FrontendController, BackendController],
})
export class CrudCoreModule {}
