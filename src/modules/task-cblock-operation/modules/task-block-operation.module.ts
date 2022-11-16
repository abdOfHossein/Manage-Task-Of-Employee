import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskBlockOperationEnt } from './entities/task-block-operation.entity';
import { TaskBlockOperationRepo } from './repositories/task-block-operation.repository';
import { TaskBlockOperationService } from './services/task-block-operation.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskBlockOperationEnt])],
  providers: [TaskBlockOperationService, TaskBlockOperationRepo],
  exports: [TaskBlockOperationService],
})
export class TaskBlockOperationModule {}
