import { Injectable } from '@nestjs/common';
import { FindOneOptions, QueryRunner } from 'typeorm';
import { CreateDepartmentDto } from '../dtos/create.department.dto';
import { UpdateDepartmentDto } from '../dtos/update.department.dto';
import { DepartmentEnt } from '../entities/department.entity';
import { DepartmentPageDto } from '../paginations/department.page.dto';
import { DepartmentRepo } from '../repositories/department.repository';

@Injectable()
export class DepartmentService {
  constructor(private departmentRepo: DepartmentRepo) {}

  async createDepartment(createDt: CreateDepartmentDto, query?: QueryRunner) {
    try {
      return await this.departmentRepo.createDepartment(createDt, query);
    } catch (e) {
      throw e;
    }
  }

  async getAllDepartment() {
    try {
      return await this.departmentRepo.getAllDepartment();
    } catch (e) {
      console.log(e);
    }
  }
  async findOneDepartment(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.departmentRepo.findOneDepartment(searchDto, options);
    } catch (e) {
      throw e;
    }
  }

  async getDepartmentUsers(id_department: string) {
    return await this.departmentRepo.getDepartmentUsers(id_department);
  }

  async updateDepartment(
    Department_Id: string,
    updateDt: UpdateDepartmentDto,
    query?: QueryRunner,
  ) {
    try {
      const departmentEnt = <DepartmentEnt>(
        await this.findOneDepartment(Department_Id)
      );
      return await this.departmentRepo.updateDepartment(
        departmentEnt,
        updateDt,
        query,
      );
    } catch (e) {
      throw e;
    }
  }

  async paginationDepartment(pageDto: DepartmentPageDto) {
    try {
      return await this.departmentRepo.paginationDepartment(pageDto);
    } catch (e) {
      throw e;
    }
  }

  async allReqOfDepartment(id_user:string) {
    try {
      return await this.departmentRepo.allReqOfDepartment(id_user);
    } catch (e) {
      throw e;
    }
  }
  
  async allTaskOfDepartment(id_user:string) {
    try {
      return await this.departmentRepo.allTaskOfDepartment(id_user);
    } catch (e) {
      throw e;
    }
  }
  
  async allUsersOfDepartment(id_user:string) {
    try {
      return await this.departmentRepo.allUsersOfDepartment(id_user);
    } catch (e) {
      throw e;
    }
  }

  async allTaskOfUser(id_header:string,id_user:string) {
    try {
      return await this.departmentRepo.allTaskOfUser(id_header,id_user);
    } catch (e) {
      throw e;
    }
  }
  
  async allReqWithoutTaskOfDepartment(id_user:string) {
    try {
      return await this.departmentRepo.allReqWithoutTaskOfDepartment(id_user);
    } catch (e) {
      throw e;
    }
  }
}
