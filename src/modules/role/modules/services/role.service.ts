import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
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
    return await this.roleRepo.findOneRole(searchDto, options);
  }

  async paginationRole(pageDto: RolePageDto) {
    return await this.roleRepo.paginationRole(pageDto);
  }

  async findAllRole() {
    return await this.roleRepo.findAllRole();
  }
}
