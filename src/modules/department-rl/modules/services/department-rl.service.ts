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
    private departmentRlRepo: DepartmentRlRepo,
    private dataSource: DataSource,
  ) {}

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

  async findByDepartmentRequest(id_req: string, id_department: string) {
    return await this.departmentRlRepo.findByDepartmentRequest(id_req, id_department)
  }

  async updateDepartmentRl(
    id_departmen_rl: string,
    updateDt: UpdateDepartmentRlDto,
    query?: QueryRunner,
  ) {
    try {
     
      const department_rl = await this.dataSource.manager.findOne(DepartmentRlEnt,{where:{
        id:id_departmen_rl
      }})
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
