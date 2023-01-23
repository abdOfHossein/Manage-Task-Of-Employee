import { Injectable } from '@nestjs/common';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { HandlerService } from '../../utility/handler/handler.service';
import { HandlerError } from '../class/handler.error';
import { ParamResultEnum } from '../enums/param.result.enum';

@Injectable()
export abstract class AbstractServiceClass<
  entity,
  createDto,
  updateDto,
  pageDto,
> {
  className = '';
  nestLogger = new NestLogger(this.className);
  // repo : DataSource=null
  // handlerService :HandlerService = null
  protected constructor(
    public dataSource: DataSource,
    public handlerService: HandlerService,
  ) {
    // this.repo = dataSource_
    // this.handlerService = handlerService_
  }
  // GetOne
  protected abstract _getOne(searchDto: string, options?: FindOneOptions);
  abstract _resultGetOneDto(ent: entity);
  async getOne<T extends BaseEntity>(
    searchDto: string,
    paramResult: ParamResultEnum,
    options?: FindOneOptions,
  ) {
    try {
      const getOneResult = await this._getOne(searchDto, options);
      if (paramResult == ParamResultEnum.Entity) return getOneResult;
      return await this._resultGetOneDto(getOneResult);
    } catch (e) {
      this.nestLogger.log(this.className, 'Get One');
      this.nestLogger.log('Error', e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  //create
  protected abstract _create(createDt: createDto, query?: QueryRunner);
  abstract _resultCreateDto(ent: entity);
  async create(
    createDto: createDto,
    paramResult: ParamResultEnum,
    query?: QueryRunner,
  ) {
    try {
      const createEntity = await this._create(createDto, query);
      if (paramResult == ParamResultEnum.Entity) return createEntity;
      return await this._resultCreateDto(createEntity);
    } catch (e) {
      this.nestLogger.log(this.className, 'Create');
      this.nestLogger.log('Error', e);
      console.log('///////////////////// service 2 ///////////////////');
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('resssssssssssssss');
      console.log(result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  //delete
  protected abstract _delete(searchDto: string, query?: QueryRunner);
  abstract _resultDeleteDto(ent: entity);
  async delete(
    searchDto: string,
    paramResult: ParamResultEnum,
    query?: QueryRunner,
  ) {
    try {
      const deleteEntity = await this._delete(searchDto, query);
      if (paramResult == ParamResultEnum.Entity) return deleteEntity;
      return await this._resultDeleteDto(deleteEntity);
    } catch (e) {
      this.nestLogger.log(this.className, 'Delete');
      this.nestLogger.log('Error', e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
  //update
  protected abstract _update(
    role_Id: string,
    updateDt: updateDto,
    query?: QueryRunner,
  );
  abstract _resultUpdateDto(ent: entity);
  async update(
    role_Id: string,
    updateDto: updateDto,
    paramResult: ParamResultEnum,
    query?: QueryRunner,
  ) {
    try {
      console.log(updateDto);
      const updateEntity = await this._update(role_Id, updateDto, query);
      if (paramResult == ParamResultEnum.Entity) return updateEntity;
      return await this._resultUpdateDto(updateEntity);
    } catch (e) {
      this.nestLogger.log(this.className, 'Update');
      this.nestLogger.log('Error', e);
      const result = await HandlerError.errorHandler(e);
      console.log('555555555555555555555555555555555');
      console.log(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  //pagination
  protected abstract _pagination(pageDto: pageDto);
  async pagination(pageDto: pageDto) {
    try {
      console.log(pageDto);
      return await this._pagination(pageDto);
    } catch (e) {
      this.nestLogger.log(this.className, 'Update');
      this.nestLogger.log('Error', e);
      const result = await HandlerError.errorHandler(e);
      console.log('555555555555555555555555555555555');
      console.log(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
