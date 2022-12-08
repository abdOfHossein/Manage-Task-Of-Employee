import { Injectable } from '@nestjs/common';
import { SuccessDto } from 'src/common/result/success.dto';
import { FindOneOptions, QueryRunner } from 'typeorm';
import { CreateBackendDto } from '../dtos/create.backend.dto';
import { UpdateBackendDto } from '../dtos/update.backend.dto';
import { BackendEnt } from '../entities/backend.entity';
import { BackendPageDto } from '../pagination/backend.page.dto';
import { BackendRepo } from '../repositories/backend.repository';
import { BackendCUDto } from '../results/backend.c.u.dto';
import { BackendGDto } from '../results/backend.g.dto';

@Injectable()
export class BackendService {
  constructor(private backendRepo: BackendRepo) {}

  async _getOne(searchDto: string, options?: FindOneOptions<any>) {
    return await this.backendRepo._findOneEntity(searchDto, options);
  }
  _resultGetOneDto(ent: BackendEnt) {
    return new BackendGDto(ent);
  }
  async _create(createDt: CreateBackendDto, query?: QueryRunner) {
    const exist = await this.findOneByRoute(createDt.route);
    if (exist) {
      throw new Error(
        `${JSON.stringify({
          section: 'crud_backend',
          value: 'Route Already Exist',
        })}`,
      );
    }
    return await this.backendRepo._createEntity(createDt, query);
  }
  _resultCreateDto(ent: BackendEnt) {
    return new BackendCUDto(ent);
  }
  async _delete(searchDto: string, query?: QueryRunner) {
    const backendEnt = await this._getOne(searchDto);
    return await this.backendRepo._deleteEntity(backendEnt, query);
  }
  _resultDeleteDto(ent: BackendEnt) {
    return new SuccessDto(true);
  }
  async _update(
    backend_Id: string,
    updateDt: UpdateBackendDto,
    query?: QueryRunner,
  ) {
    const backendEnt = await this._getOne(backend_Id);
    return await this.backendRepo._updateEntity(backendEnt, updateDt, query);
  }
  _resultUpdateDto(ent: BackendEnt) {
    return new BackendCUDto(ent);
  }
  async _pagination(pageDto: BackendPageDto) {
    return await this.backendRepo._paginationEntity(pageDto);
  }

  async findOneByRoute(route: string) {
    return await this.backendRepo.findOneByRoute(route);
  }
}
