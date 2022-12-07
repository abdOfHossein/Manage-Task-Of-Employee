import { Module } from '@nestjs/common';
import { EventModule } from '../modules/event.module';
import { EventController } from './controller/event.controller';

@Module({
  imports: [EventModule],
  controllers: [EventController],
})
export class EventCoreModule {}
