import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateEventDto } from '../dtos/create.event.dto';
import { UpdateEventDto } from '../dtos/update.event.dto';
import { EventEnt } from '../entities/event.entity';
import { EventPageDto } from '../paginations/event.page.dto';
import { EventRepo } from '../repositories/Event.repository';

@Injectable()
export class EventService extends AbstractServiceClass<
  EventEnt,
  CreateEventDto,
  UpdateEventDto,
  EventPageDto
> {
  public constructor(
    private eventRepo: EventRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: EventEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateEventDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: EventEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: EventEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateEventDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: EventEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: EventPageDto) {
    throw new Error('Method not implemented.');
  }

  async createEvent(createDt: CreateEventDto, query?: QueryRunner) {
    try {
      return await this.eventRepo.createEvent(createDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async findOneEvent(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.eventRepo.findOneEvent(searchDto, options);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
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
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async paginationEvent() {
    try {
      return await this.eventRepo.paginationEvent();
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
