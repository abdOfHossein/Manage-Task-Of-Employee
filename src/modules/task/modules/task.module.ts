import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEnt } from './entities/task.entity';
import { TaskRepo } from './repositories/task.repository';
import { TaskService } from './services/task.service';
@Module({
  imports: [TypeOrmModule.forFeature([TaskEnt])],
  providers: [TaskService, TaskRepo],
  exports: [TaskService],
})
export class TaskModule {}
