import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateDepartmentRlDto } from '../dtos/create.department-rl.dto';
import { UpdateDepartmentRlDto } from '../dtos/update.department-rl.dto';
import { DepartmentRlEnt } from '../entities/department-rl.entity';
import { DepartmentRlPageDto } from '../paginations/department-rl.page.dto';
import { DepartmentRlRepo } from '../repositories/department-rl.repository';

@Injectable()
export class DepartmentRlService extends AbstractServiceClass<
  DepartmentRlEnt,
  CreateDepartmentRlDto,
  UpdateDepartmentRlDto,
  DepartmentRlPageDto
> {
  public constructor(
    private departmentRlRepo: DepartmentRlRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: DepartmentRlEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateDepartmentRlDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: DepartmentRlEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: DepartmentRlEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateDepartmentRlDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: DepartmentRlEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: DepartmentRlPageDto) {
    throw new Error('Method not implemented.');
  }

  async createDepartmentRl(
    createDt: CreateDepartmentRlDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.departmentRlRepo.createDepartmentRl(createDt, query);
    } catch (e) {
      throw e;
    }
  }

  async findOneDepartmentRl(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.departmentRlRepo.findOneDepartmentRl(
        searchDto,
        options,
      );
    } catch (e) {
      throw e;
    }
  }

  async findByDepartmentRequest(id_req: string, id_user: string) {
    return await this.departmentRlRepo.findByDepartmentRequest(
      id_req,
      id_user,
    );
  }

  async updateDepartmentRl(
    id_departmen_rl: string,
    updateDt: UpdateDepartmentRlDto,
    query?: QueryRunner,
  ) {
    try {
      const department_rl = await this.dataSource.manager.findOne(
        DepartmentRlEnt,
        {
          where: {
            id: id_departmen_rl,
          },
        },
      );
      return await this.departmentRlRepo.updateDepartmentRl(
        department_rl,
        updateDt,
        query,
      );
    } catch (e) {
      throw e;
    }
  }

  async paginationDepartmentRl(pageDto: DepartmentRlPageDto) {
    try {
      return await this.departmentRlRepo.paginationDepartmentRl(pageDto);
    } catch (e) {
      throw e;
    }
  }
}
