import { Injectable } from '@nestjs/common';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { FindOneOptions, QueryRunner } from 'typeorm';
import { CreateEventDto } from '../dtos/create.event.dto';
import { UpdateEventDto } from '../dtos/update.event.dto';
import { EventEnt } from '../entities/event.entity';
import { EventRepo } from '../repositories/Event.repository';

@Injectable()
export class EventService {
  constructor(private eventRepo: EventRepo,private handlerService:HandlerService) {}
  async createEvent(createDt: CreateEventDto, query?: QueryRunner) {
    try {
      return await this.eventRepo.createEvent(createDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
  }

  async findOneEvent(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.eventRepo.findOneEvent(searchDto, options);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
  }

  async updateEvent(
    Event_Id: string,
    updateDt: UpdateEventDto,
    query?: QueryRunner,
  ) {
    try {
      const eventEnt = <EventEnt>await this.findOneEvent(Event_Id);
      return await this.eventRepo.updateEvent(eventEnt, updateDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
  }

  async paginationEvent() {
    try {
      return await this.eventRepo.paginationEvent();
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
  }
}
