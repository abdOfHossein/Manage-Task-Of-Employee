import { Module } from '@nestjs/common';
import { RelTaskModule } from '../modules/rel-task.module';
import { RelTaskController } from './controller/rel-task.controller';

@Module({
  imports: [RelTaskModule],
  controllers: [RelTaskController],
})
export class RelTaskCoreModule {}
