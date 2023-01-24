import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateDepartmentDto } from '../dtos/create.department.dto';
import { UpdateDepartmentDto } from '../dtos/update.department.dto';
import { DepartmentEnt } from '../entities/department.entity';
import { DepartmentPageDto } from '../paginations/department.page.dto';
import { DepartmentRepo } from '../repositories/department.repository';

@Injectable()
export class DepartmentService extends AbstractServiceClass<
  DepartmentEnt,
  CreateDepartmentDto,
  UpdateDepartmentDto,
  DepartmentPageDto
> {
  public constructor(
    private departmentRepo: DepartmentRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: DepartmentEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateDepartmentDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: DepartmentEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: DepartmentEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateDepartmentDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: DepartmentEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: DepartmentPageDto) {
    throw new Error('Method not implemented.');
  }

  async createDepartment(createDt: CreateDepartmentDto, query?: QueryRunner) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      await queryRunner.connect();
      return await this.departmentRepo.createDepartment(createDt, queryRunner);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllDepartment() {
    try {
      return await this.departmentRepo.getAllDepartment();
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async findOneDepartment(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.departmentRepo.findOneDepartment(searchDto, options);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async getDepartmentUsers(id_department: string) {
    try {
      return await this.departmentRepo.getDepartmentUsers(id_department);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
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
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async paginationDepartment(pageDto: DepartmentPageDto) {
    try {
      return await this.departmentRepo.paginationDepartment(pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async allReqOfDepartment(id_user: string) {
    try {
      return await this.departmentRepo.allReqOfDepartment(id_user);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async allTaskOfDepartment(id_user: string) {
    try {
      return await this.departmentRepo.allTaskOfDepartment(id_user);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async allUsersOfDepartment(id_user: string) {
    try {
      return await this.departmentRepo.allUsersOfDepartment(id_user);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async allTaskOfUser(id_header: string, id_user: string) {
    try {
      return await this.departmentRepo.allTaskOfUser(id_header, id_user);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async allReqWithoutTaskOfDepartment(id_user: string) {
    try {
      return await this.departmentRepo.allReqWithoutTaskOfDepartment(id_user);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async allDepartmentOfUser(id_user: string) {
    try {
      return await this.departmentRepo.allDepartmentOfUser(id_user);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async deleteDepartmen(id_department: string) {
    try {
      return await this.departmentRepo.deleteDepartmen(id_department);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
