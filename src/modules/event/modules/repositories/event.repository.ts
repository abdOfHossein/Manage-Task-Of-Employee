import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateEventDto } from '../dtos/create.event.dto';
import { UpdateEventDto } from '../dtos/update.event.dto';
import { EventEnt } from '../entities/event.entity';

export class EventRepo {
  constructor(
    @InjectRepository(EventEnt)
    private dataSource: DataSource,
  ) {}

  async createEvent(
    createDto: CreateEventDto,
    query: QueryRunner | undefined,
  ): Promise<EventEnt> {
    const eventEnt = new EventEnt();
    eventEnt.tittle = createDto.tittle;
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
    entity.tittle = updateDto.tittle;
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
