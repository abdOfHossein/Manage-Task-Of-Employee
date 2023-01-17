import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { TaskBlockOperationEnt } from './entities/task-block-operation.entity';
import { TaskBlockOperationRepo } from './repositories/task-block-operation.repository';
import { TaskBlockOperationService } from './services/task-block-operation.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskBlockOperationEnt])],
  providers: [TaskBlockOperationService, TaskBlockOperationRepo, HandlerService,TranslateService],
  exports: [TaskBlockOperationService],
})
export class TaskBlockOperationModule {}
