import { Injectable } from '@nestjs/common';
import { FindOneOptions, QueryRunner } from 'typeorm';
import { CreateEventDto } from '../dtos/create.event.dto';
import { UpdateEventDto } from '../dtos/update.event.dto';
import { EventEnt } from '../entities/event.entity';
import { EventRepo } from '../repositories/Event.repository';

@Injectable()
export class EventService {
  constructor(private eventRepo: EventRepo) {}

  async createEvent(createDt: CreateEventDto, query?: QueryRunner) {
    try {
      return await this.eventRepo.createEvent(createDt, query);
    } catch (e) {
      throw e;
    }
  }

  async findOneEvent(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.eventRepo.findOneEvent(searchDto, options);
    } catch (e) {
      throw e;
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
      throw e;
    }
  }

  async paginationEvent() {
    try {
      return await this.eventRepo.paginationEvent();
    } catch (e) {
      throw e;
    }
  }
}
