import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateFrontendDto } from '../dtos/create.frontend.dto';
import { UpdateFrontendDto } from '../dtos/update.frontend.dto';
import { FrontendEnt } from '../entities/frontend.entity';
import { FrontendPageDto } from '../pagination/frontend.page.dto';
import { FrontendRepo } from '../repositories/frontend.repository';

@Injectable()
export class FrontendService extends AbstractServiceClass<
  FrontendEnt,
  CreateFrontendDto,
  UpdateFrontendDto,
  FrontendPageDto
> {
  public constructor(
    private frontendRepo: FrontendRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  _resultGetOneDto(ent: FrontendEnt) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: FrontendEnt) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: FrontendEnt) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: FrontendEnt) {
    throw new Error('Method not implemented.');
  }

  //pagination
  async _pagination(pageDto: FrontendPageDto) {
    try {
      return this.frontendRepo._paginationEntity(pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  //create
  async _create(createDt: CreateFrontendDto, query?: QueryRunner) {
    try {
      return await this.frontendRepo._createEntity(createDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  _getOne(searchDto: string, options?: FindOneOptions<any>) {
    return this.frontendRepo._findOneEntity(searchDto, options);
  }

  async _update(
    id_frontend: string,
    updateDt: UpdateFrontendDto,
    query?: QueryRunner,
  ) {
    try {
      const frontendEnt = await this._getOne(id_frontend);
      return await this.frontendRepo._updateEntity(
        frontendEnt,
        updateDt,
        query,
      );
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async _delete(searchDto: string, query?: QueryRunner) {
    try {
      const frontendEnt = await this._getOne(searchDto);
      return await this.frontendRepo._deleteEntity(frontendEnt);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async getAll() {
    try {
      return await this.frontendRepo.getAll();
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
