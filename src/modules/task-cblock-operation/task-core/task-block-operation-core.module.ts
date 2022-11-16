import { Module } from '@nestjs/common';
import { TaskBlockOperationModule } from '../modules/task-block-operation.module';
import { TaskBlockOperationController } from './controller/task-block-operation.controller';

@Module({
  imports: [TaskBlockOperationModule],
  controllers: [TaskBlockOperationController],
})
export class TaskBlockOperationCoreModule {}
