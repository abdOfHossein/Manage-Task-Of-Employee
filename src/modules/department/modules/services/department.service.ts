import { BadRequestException, Injectable } from '@nestjs/common';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateDepartmentDto } from '../dtos/create.department.dto';
import { UpdateDepartmentDto } from '../dtos/update.department.dto';
import { DepartmentEnt } from '../entities/department.entity';
import { DepartmentPageDto } from '../paginations/department.page.dto';
import { DepartmentRepo } from '../repositories/department.repository';

@Injectable()
export class DepartmentService {
  constructor(
    private departmentRepo: DepartmentRepo,
    private dataSource: DataSource,
    private handlerService: HandlerService,
  ) {}

  async createDepartment(createDt: CreateDepartmentDto, query?: QueryRunner) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      await queryRunner.connect();
      return await this.departmentRepo.createDepartment(createDt, queryRunner);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async getAllDepartment() {
    try {
      return await this.departmentRepo.getAllDepartment();
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
  }

  async findOneDepartment(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.departmentRepo.findOneDepartment(searchDto, options);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
  }

  async getDepartmentUsers(id_department: string) {
    try {
    return await this.departmentRepo.getDepartmentUsers(id_department);
      
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
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

  async allReqOfDepartment(id_user: string) {
    try {
      return await this.departmentRepo.allReqOfDepartment(id_user);
    } catch (e) {
      throw e;
    }
  }

  async allTaskOfDepartment(id_user: string) {
    try {
      return await this.departmentRepo.allTaskOfDepartment(id_user);
    } catch (e) {
      throw e;
    }
  }

  async allUsersOfDepartment(id_user: string) {
    try {
      return await this.departmentRepo.allUsersOfDepartment(id_user);
    } catch (e) {
      throw e;
    }
  }

  async allTaskOfUser(id_header: string, id_user: string) {
    try {
      return await this.departmentRepo.allTaskOfUser(id_header, id_user);
    } catch (e) {
      throw e;
    }
  }

  async allReqWithoutTaskOfDepartment(id_user: string) {
    try {
      return await this.departmentRepo.allReqWithoutTaskOfDepartment(id_user);
    } catch (e) {
      throw e;
    }
  }

  async allDepartmentOfUser(id_user: string) {
    try {
      return await this.departmentRepo.allDepartmentOfUser(id_user);
    } catch (e) {
      throw e;
    }
  }

  async deleteDepartmen(id_department: string) {
    try {
      return await this.departmentRepo.deleteDepartmen(id_department);
    } catch (e) {
      throw e;
    }
  }
}
