import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateRelTaskDto } from '../dtos/create.rel-task.dto';
import { UpdateRelTaskDto } from '../dtos/update.rel-task.dto';
import { RelTaskEnt } from '../entities/rel-task.entity';
import { RelTaskPageDto } from '../paginations/rel-task.page.dto';
import { RelTaskRepo } from '../repositories/rel-task.repository';

@Injectable()
export class RelTaskService extends AbstractServiceClass<
  RelTaskEnt,
  CreateRelTaskDto,
  UpdateRelTaskDto,
  RelTaskPageDto
> {
  public constructor(
    @InjectRepository(RelTaskEnt)
    dataSource: DataSource,
    handlerService: HandlerService,
    private relTaskRepo: RelTaskRepo,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: RelTaskEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateRelTaskDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: RelTaskEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: RelTaskEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateRelTaskDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: RelTaskEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: RelTaskPageDto) {
    throw new Error('Method not implemented.');
  }

  async createRelTask(createDt: CreateRelTaskDto, query?: QueryRunner) {
    try {
      return await this.relTaskRepo.createRelTask(createDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async findOneRelTask(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.relTaskRepo.findOneRelTask(searchDto, options);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async updateRelTask(
    RelTask_Id: string,
    updateDt: UpdateRelTaskDto,
    query?: QueryRunner,
  ) {
    try {
      const relTaskEnt = await this.dataSource.manager.findOne(RelTaskEnt, {
        where: { id: RelTask_Id },
      });

      return await this.relTaskRepo.updateRelTask(relTaskEnt, updateDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async paginationRelTask(pageDto: RelTaskPageDto) {
    try {
      return await this.relTaskRepo.paginationRelTask(pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
