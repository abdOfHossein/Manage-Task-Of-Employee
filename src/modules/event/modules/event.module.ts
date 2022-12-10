import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEnt } from './entities/event.entity';
import { EventRepo } from './repositories/Event.repository';
import { EventService } from './services/event.service';
@Module({
  imports: [TypeOrmModule.forFeature([EventEnt])],
  providers: [EventService, EventRepo],
  exports: [EventService],
})
export class EventModule {}
