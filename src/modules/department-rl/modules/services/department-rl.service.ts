import { Injectable } from '@nestjs/common';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateDepartmentRlDto } from '../dtos/create.department-rl.dto';
import { UpdateDepartmentRlDto } from '../dtos/update.department-rl.dto';
import { DepartmentRlEnt } from '../entities/department-rl.entity';
import { DepartmentRlPageDto } from '../paginations/department-rl.page.dto';
import { DepartmentRlRepo } from '../repositories/department-rl.repository';

@Injectable()
export class DepartmentRlService {
  constructor(
    private DepartmentRlRepo: DepartmentRlRepo,
    private dataSource: DataSource,
  ) {}

  async createDepartmentRl(
    createDt: CreateDepartmentRlDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.DepartmentRlRepo.createDepartmentRl(createDt, query);
    } catch (e) {
      throw e;
    }
  }

  async findOneDepartmentRl(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.DepartmentRlRepo.findOneDepartmentRl(
        searchDto,
        options,
      );
    } catch (e) {
      throw e;
    }
  }

  async updateDepartmentRl(
    DepartmentRl_Id: string,
    updateDt: UpdateDepartmentRlDto,
    query?: QueryRunner,
  ) {
    try {
      updateDt.reqEnt = await this.dataSource
        .getRepository(ReqEnt)
        .findOne({ where: { id: updateDt.req_id } });
      updateDt.departmentEnt = await this.dataSource
        .getRepository(DepartmentEnt)
        .findOne({ where: { id: updateDt.department_id } });
      const DepartmentRlEnt = <DepartmentRlEnt>(
        await this.findOneDepartmentRl(DepartmentRl_Id)
      );
      return await this.DepartmentRlRepo.updateDepartmentRl(
        DepartmentRlEnt,
        updateDt,
        query,
      );
    } catch (e) {
      throw e;
    }
  }

  async paginationDepartmentRl(pageDto: DepartmentRlPageDto) {
    try {
      return await this.DepartmentRlRepo.paginationDepartmentRl(pageDto);
    } catch (e) {
      throw e;
    }
  }
}
