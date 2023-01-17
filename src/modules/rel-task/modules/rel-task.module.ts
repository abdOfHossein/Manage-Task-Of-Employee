import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { RelTaskEnt } from './entities/rel-task.entity';
import { RelTaskRepo } from './repositories/rel-task.repository';
import { RelTaskService } from './services/rel-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([RelTaskEnt])],
  providers: [RelTaskService, RelTaskRepo, HandlerService, TranslateService],
  exports: [RelTaskService],
})
export class RelTaskModule {}
