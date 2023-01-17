import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/modules/role/modules/role.module';
import { HandlerModule } from 'src/utility/handler/handler.module';
import { BackendModule } from '../backend/backend.module';
import { BackendEnt } from '../backend/entities/backend.entity';
import { RoleRlBackendEnt } from './entities/role-rl-backend.entity';
import { RoleRlBackendRepo } from './repositories/role-rl-backend.repository';
import { RoleRlBackendService } from './services/role-rl-backend.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRlBackendEnt, BackendEnt]),
    RoleModule,
    BackendModule,
    HandlerModule,
  ],
  providers: [RoleRlBackendService, RoleRlBackendRepo],
  exports: [RoleRlBackendService],
})
export class RoleRlBackendModule {}
