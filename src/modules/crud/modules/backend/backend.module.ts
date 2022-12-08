import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackendEnt } from './entities/backend.entity';
import { BackendRepo } from './repositories/backend.repository';
import { BackendService } from './services/backend.service';

@Module({
  imports: [TypeOrmModule.forFeature([BackendEnt])],
  providers: [BackendService, BackendRepo],
  exports: [BackendService],
})
export class BackendModule {}
