import { Injectable } from '@nestjs/common';
import { SuccessDto } from 'src/common/result/success.dto';
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
  constructor(private frontendRepo: FrontendRepo, dataSource: DataSource) {}

  //pagination
 _pagination(pageDto: FrontendPageDto) {
    return this.frontendRepo._paginationEntity(pageDto);
  }

  //create
 async _create(createDt: CreateFrontendDto, query?: QueryRunner) {
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
  }
  _resultCreateDto(ent: FrontendEnt) {
    return new FrontendCUDto(ent);
  }

  //readOne
 _getOne(searchDto: string, options?: FindOneOptions<any>) {
    return this.frontendRepo._findOneEntity(searchDto, options);
  }
  _resultGetOneDto(ent: FrontendEnt) {
    return new FrontendGDto(ent);
  }

  //Update
 async _update(
    id_frontend: string,
    updateDt: UpdateFrontendDto,
    query?: QueryRunner,
  ) {
    const frontendEnt = await this._getOne(id_frontend);
    return await this.frontendRepo._updateEntity(frontendEnt, updateDt, query);
  }
  _resultUpdateDto(ent: FrontendEnt) {
    return new FrontendCUDto(ent);
  }

  //delete
 async _delete(searchDto: string, query?: QueryRunner) {
    const frontendEnt = await this._getOne(searchDto);
    return await this.frontendRepo._deleteEntity(frontendEnt);
  }
  _resultDeleteDto(ent: FrontendEnt) {
    return new SuccessDto(true);
  }
}
