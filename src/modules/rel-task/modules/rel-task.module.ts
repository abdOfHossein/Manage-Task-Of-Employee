import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelTaskEnt } from './entities/rel-task.entity';
import { RelTaskRepo } from './repositories/rel-task.repository';
import { RelTaskService } from './services/rel-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([RelTaskEnt])],
  providers: [RelTaskService, RelTaskRepo],
  exports: [RelTaskService],
})
export class RelTaskModule {}
