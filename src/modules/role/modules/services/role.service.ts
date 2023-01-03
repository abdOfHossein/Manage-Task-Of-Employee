import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { ConfigRoleDto } from '../dtos/config.roele.dto';
import { CreateRoleDto } from '../dtos/create.role.dto';
import { RolePageDto } from '../paginations/role.page.dto';
import { RoleRepo } from '../repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(private dataSource: DataSource, private roleRepo: RoleRepo) {}

  async createRole(createDt: CreateRoleDto, query?: QueryRunner) {
    try {
      return await this.roleRepo.createRole(createDt, query);
    } catch (e) {
      throw e;
    }
  }

  async findOneRole(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.roleRepo.findOneRole(searchDto, options);
    } catch (e) {
      throw e;
    }
  }

  async paginationRole(pageDto: RolePageDto) {
    try {
      return await this.roleRepo.paginationRole(pageDto);
    } catch (e) {
      throw e;
    }
  }

  async findAllRole() {
    try {
      return await this.roleRepo.findAllRole();
    } catch (e) {
      throw e;
    }
  }

  async configRole(id_user:string,configRoleDto: ConfigRoleDto, query?: QueryRunner) {
    try {
      return await this.roleRepo.configRole(id_user,configRoleDto,query);
    } catch (e) {
      throw e;
    }
  }
  async deleteRole(id_role:string, query?: QueryRunner) {
    try {
      return await this.roleRepo.deleteRole(id_role,query);
    } catch (e) {
      throw e;
    }
  }
}
