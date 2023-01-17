import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { EventEnt } from './entities/event.entity';
import { EventRepo } from './repositories/Event.repository';
import { EventService } from './services/event.service';
@Module({
  imports: [TypeOrmModule.forFeature([EventEnt])],
  providers: [EventService, EventRepo, HandlerService,TranslateService],
  exports: [EventService],
})
export class EventModule {}
