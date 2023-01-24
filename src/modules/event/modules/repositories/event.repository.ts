import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepositoryClass } from 'src/common/abstract/abstract.repository.class';
import { PageDto } from 'src/common/dtos/page.dto';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateEventDto } from '../dtos/create.event.dto';
import { UpdateEventDto } from '../dtos/update.event.dto';
import { EventEnt } from '../entities/event.entity';
import { EventPageDto } from '../paginations/event.page.dto';

export class EventRepo extends AbstractRepositoryClass<
  EventEnt,
  CreateEventDto,
  UpdateEventDto,
  EventPageDto
> {
  constructor(
    @InjectRepository(EventEnt)
    dataSource: DataSource,
    handlerService: HandlerService,
  ) {
    super(dataSource, handlerService);
  }

  _findOneEntity(
    searchDto: string,
    options?: FindOneOptions<any>,
  ): Promise<EventEnt> {
    throw new Error('Method not implemented.');
  }
  _createEntity(
    createDto: CreateEventDto,
    query?: QueryRunner,
  ): Promise<EventEnt> {
    throw new Error('Method not implemented.');
  }
  _updateEntity(
    entity: EventEnt,
    updateDto: UpdateEventDto,
    query?: QueryRunner,
  ): Promise<EventEnt> {
    throw new Error('Method not implemented.');
  }
  _deleteEntity(entity: EventEnt, query?: QueryRunner): Promise<EventEnt> {
    throw new Error('Method not implemented.');
  }
  _paginationEntity(pageDto: EventPageDto): Promise<PageDto<EventEnt>> {
    throw new Error('Method not implemented.');
  }

  async createEvent(
    createDto: CreateEventDto,
    query: QueryRunner | undefined,
  ): Promise<EventEnt> {
    const eventEnt = new EventEnt();
    eventEnt.title = createDto.title;
    eventEnt.priority = createDto.priority;
    eventEnt.start_date = createDto.start_date;
    eventEnt.end_date = createDto.end_date;
    if (query) return await query.manager.save(eventEnt);
    return await this.dataSource.manager.save(eventEnt);
  }

  async findOneEvent(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<EventEnt> {
    const event = await this.dataSource.manager.findOne(EventEnt, {
      where: { id: searchDto },
    });
    if (!event)
      throw new BadGatewayException({ message: 'Event does not exits' });
    return event;
  }

  async updateEvent(
    entity: EventEnt,
    updateDto: UpdateEventDto,
    query?: QueryRunner,
  ): Promise<EventEnt> {
    entity.title = updateDto.title;
    entity.priority = updateDto.priority;
    entity.start_date = updateDto.start_date;
    entity.end_date = updateDto.end_date;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async paginationEvent(): Promise<EventEnt[]> {
    return await this.dataSource.manager.find(EventEnt, {});
  }
}
