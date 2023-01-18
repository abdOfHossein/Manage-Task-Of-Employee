import { Injectable } from '@nestjs/common';
import { HandlerError } from 'src/common/class/handler.error';
import { SuccessDto } from 'src/common/result/success.dto';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateFrontendDto } from '../dtos/create.frontend.dto';
import { UpdateFrontendDto } from '../dtos/update.frontend.dto';
import { FrontendEnt } from '../entities/frontend.entity';
import { FrontendPageDto } from '../pagination/frontend.page.dto';
import { FrontendRepo } from '../repositories/frontend.repository';
import { FrontendCUDto } from '../results/frontend.c.u.dto';
import { FrontendGDto } from '../results/frontend.g.dto';

@Injectable()
export class FrontendService {
  //constructor
  constructor(
    private frontendRepo: FrontendRepo,
    dataSource: DataSource,
    private handlerService: HandlerService,
  ) {}

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
      const exist = await this.frontendRepo.findByRoute(createDt.route);
      if (exist) {
        throw new Error(
          `${JSON.stringify({
            section: 'crud_frontend',
            value: 'Route Already Exist',
          })}`,
        );
      }
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
