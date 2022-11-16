import { Module } from '@nestjs/common';
import { TaskModule } from '../modules/task.module';
import { TaskController } from './controller/task.controller';

@Module({
  imports: [TaskModule],
  controllers: [TaskController],
})
export class TaskCoreModule {}
