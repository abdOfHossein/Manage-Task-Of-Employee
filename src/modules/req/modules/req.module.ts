import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReqEnt } from './entities/req.entity';
import { ReqRepo } from './repositories/req.repository';
import { ReqService } from './services/req.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReqEnt])],
  providers: [ReqService, ReqRepo],
  exports: [ReqService],
})
export class ReqModule {}
