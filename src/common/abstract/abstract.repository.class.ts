import { Injectable } from '@nestjs/common';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { HandlerService } from '../../utility/handler/handler.service';
import { PageDto } from '../dtos/page.dto';
import { PublicEnum } from '../translate/enums/public.enum';

@Injectable()
export abstract class AbstractRepositoryClass<T, Y, Z, L> {
  // dataSource :DataSource =null
  className = '';
  nestLogger = new NestLogger(this.className);
  protected constructor(
    public dataSource: DataSource,
    private handlerService: HandlerService,
  ) {
    //  this.dataSource = dataSource_;
  }

  abstract _findOneEntity(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<T>;
  abstract _createEntity(createDto: Y, query?: QueryRunner): Promise<T>;
  abstract _updateEntity(
    entity: T,
    updateDto: Z,
    query?: QueryRunner,
  ): Promise<T>;
  abstract _deleteEntity(entity: T, query?: QueryRunner): Promise<T>;
  abstract _paginationEntity(pageDto: L): Promise<PageDto<T>>;

  async findOneEntity(searchDto: string, options?: FindOneOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this._findOneEntity(searchDto, options);
        if (result == undefined) {
          throw new Error(
            `${JSON.stringify({
              section: 'public',
              value: PublicEnum.DATA_NOT_EXISTS,
            })}`,
          );
        }
        resolve(result);
      } catch (e) {
        this.nestLogger.log(this.className, 'findOneEntity');
        this.nestLogger.log('Error', e);
        reject(e);
      }
    });
  }

  async createEntity(createDto: Y, query?: QueryRunner): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this._createEntity(createDto, query);
        resolve(result);
      } catch (e) {
        this.nestLogger.log(this.className, 'createEntity');
        this.nestLogger.log('Error', e);
        console.log('///////////////////repository1////////////////');
        console.log(e);
        reject(e);
      }
    });
  }

  async paginationEntity(pageDto: L): Promise<PageDto<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this._paginationEntity(pageDto);
        resolve(result);
      } catch (e) {
        this.nestLogger.log(this.className, 'paginationEntity');
        this.nestLogger.log('Error', e);
        reject(e);
      }
    });
  }

  async updateEntity(entity: T, updateDto: Z, query?: QueryRunner): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this._updateEntity(entity, updateDto, query);
        resolve(result);
      } catch (e) {
        this.nestLogger.log(this.className, 'updateEntity');
        this.nestLogger.log('Error', e);
        reject(e);
      }
    });
  }

  async deleteEntity(deleteEntity: T, query?: QueryRunner): Promise<T> {
    try {
      if (query) return await query.manager.remove(deleteEntity);
      return await this.dataSource.manager.remove(deleteEntity);
    } catch (e) {
      this.nestLogger.log(this.className, 'deleteEntity');
      this.nestLogger.log('Error', e);
      throw new Error(e);
    }
  }
}
