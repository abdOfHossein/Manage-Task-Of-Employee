import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateBackendDto } from '../dtos/create.backend.dto';
import { UpdateBackendDto } from '../dtos/update.backend.dto';
import { BackendEnt } from '../entities/backend.entity';
import { BackendPageDto } from '../pagination/backend.page.dto';
import { BackendRepo } from '../repositories/backend.repository';

@Injectable()
export class BackendService extends AbstractServiceClass<
  BackendEnt,
  CreateBackendDto,
  UpdateBackendDto,
  BackendPageDto
> {

  public constructor(
    private backendRepo: BackendRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }
  _resultGetOneDto(ent: BackendEnt) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: BackendEnt) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: BackendEnt) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: BackendEnt) {
    throw new Error('Method not implemented.');
  }


  async _getOne(searchDto: string, options?: FindOneOptions<any>) {
    try {
      return await this.backendRepo._findOneEntity(searchDto, options);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async _create(createDt: CreateBackendDto, query?: QueryRunner) {
    try {
      return await this.backendRepo._createEntity(createDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async _delete(searchDto: string, query?: QueryRunner) {
    try {
      const backendEnt = await this._getOne(searchDto);
      return await this.backendRepo._deleteEntity(backendEnt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async _update(
    backend_Id: string,
    updateDt: UpdateBackendDto,
    query?: QueryRunner,
  ) {
    try {
      const backendEnt = await this._getOne(backend_Id);
      return await this.backendRepo._updateEntity(backendEnt, updateDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async _pagination(pageDto: BackendPageDto) {
    try {
      return await this.backendRepo._paginationEntity(pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async findOneByRoute(route: string) {
    try {
      return await this.backendRepo.findOneByRoute(route);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
