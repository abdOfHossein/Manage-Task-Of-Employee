import { Module } from '@nestjs/common';
import { RoleModule } from '../modules/role.module';
import { RoleController } from './controller/role.controller';

@Module({
  imports: [RoleModule],
  controllers: [RoleController],
})
export class RoleCoreModule {}
