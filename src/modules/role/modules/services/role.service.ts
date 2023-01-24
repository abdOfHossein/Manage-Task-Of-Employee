import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { ConfigRoleDto } from '../dtos/config.roele.dto';
import { CreateRoleDto } from '../dtos/create.role.dto';
import { UpdateRoleDto } from '../dtos/update.role.dto';
import { RoleEnt } from '../entities/role.entity';
import { RolePageDto } from '../paginations/role.page.dto';
import { RoleRepo } from '../repositories/role.repository';

@Injectable()
export class RoleService extends AbstractServiceClass<
  RoleEnt,
  CreateRoleDto,
  UpdateRoleDto,
  RolePageDto
> {
  public constructor(
    private roleRepo: RoleRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: RoleEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateRoleDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: RoleEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: RoleEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateRoleDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: RoleEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: RolePageDto) {
    throw new Error('Method not implemented.');
  }

  async createRole(createDt: CreateRoleDto, query?: QueryRunner) {
    try {
      return await this.roleRepo.createRole(createDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
  async updateRole(updateRoleDto: UpdateRoleDto, query?: QueryRunner) {
    try {
      const roleEnt = await this.dataSource.manager.findOne(RoleEnt, {
        where: { id: updateRoleDto.id_role },
      });
      return await this.roleRepo.updateRole(roleEnt, updateRoleDto, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async findOneRole(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.roleRepo.findOneRole(searchDto, options);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async paginationRole(pageDto: RolePageDto) {
    try {
      return await this.roleRepo.paginationRole(pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async findAllRole() {
    try {
      return await this.roleRepo.findAllRole();
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async configRole(
    id_user: string,
    configRoleDto: ConfigRoleDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.roleRepo.configRole(id_user, configRoleDto, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
  async deleteRole(id_role: string, query?: QueryRunner) {
    try {
      return await this.roleRepo.deleteRole(id_role, query);
    } catch (e) {
      throw e;
    }
  }

  async paginationRoleUser(id_user: string, rolePageDto: RolePageDto) {
    try {
      return await this.roleRepo.paginationRoleUser(id_user, rolePageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async deleteSpecificRole(
    id_user: string,
    id_role: string,
    query?: QueryRunner,
  ) {
    try {
      return await this.roleRepo.deleteSpecificRole(id_user, id_role);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async addRole(id_user: string, id_role: string, query?: QueryRunner) {
    try {
      return await this.roleRepo.addRole(id_user, id_role);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
