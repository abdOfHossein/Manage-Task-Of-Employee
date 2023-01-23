import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { SuccessDto } from 'src/common/result/success.dto';
import { RoleService } from 'src/modules/role/modules/services/role.service';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { BackendEnt } from '../../backend/entities/backend.entity';
import { BackendService } from '../../backend/services/backend.service';
import { CreateRoleRlBackendDto } from '../dtos/create-role-rl-backend.dto';
import { UpdateRoleRlBackendDto } from '../dtos/update-role-rl-backend.dto';
import { RoleRlBackendEnt } from '../entities/role-rl-backend.entity';
import { RoleRlBackendPageDto } from '../pagination/country.page.dto';
import { RoleRlBackendRepo } from '../repositories/role-rl-backend.repository';
import { RoleRlBackendCUDto } from '../results/role-rl-backend.c.u.dto';
import { RoleRlBackendGDto } from '../results/role-rl-backend.g.dto';

@Injectable()
export class RoleRlBackendService extends AbstractServiceClass<
  RoleRlBackendEnt,
  CreateRoleRlBackendDto,
  UpdateRoleRlBackendDto,
  RoleRlBackendPageDto
> {
  public constructor(
    handlerService: HandlerService,
    dataSource: DataSource,
    private roleService: RoleService,
    private backendService: BackendService,
    private roleRlBackendRepo: RoleRlBackendRepo,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  _resultCreateDto(ent: RoleRlBackendEnt) {
    throw new Error('Method not implemented.');
  }

  async _getOne(searchDto: string, options?: FindOneOptions<any>) {
    return await this.roleRlBackendRepo._findOneEntity(searchDto, options);
  }
  _resultGetOneDto(ent: RoleRlBackendEnt) {
    return new RoleRlBackendGDto(ent);
  }

  async _create(createDt: CreateRoleRlBackendDto, query?: QueryRunner) {
    createDt.backend = await this.backendService._getOne(createDt.id_backend);
    createDt.role = await this.roleService.findOneRole(createDt.id_role);
    return await this.roleRlBackendRepo._createEntity(createDt, query);
  }

  async _delete(searchDto: string, query?: QueryRunner) {
    const roleRlBackendEnt = await this._getOne(searchDto);
    return await this.roleRlBackendRepo._deleteEntity(roleRlBackendEnt, query);
  }
  _resultDeleteDto(ent: RoleRlBackendEnt) {
    return new SuccessDto(true);
  }
  async _update(
    role_rl_backend_Id: string,
    updateDt: UpdateRoleRlBackendDto,
    query?: QueryRunner,
  ) {
    const roleRlBackendEnt = await this._getOne(role_rl_backend_Id);
    updateDt.backend = await this.backendService._getOne(updateDt.id_backend);
    updateDt.role = await this.roleService.findOneRole(updateDt.id_role);
    return await this.roleRlBackendRepo._updateEntity(
      roleRlBackendEnt,
      updateDt,
      query,
    );
  }
  _resultUpdateDto(ent: RoleRlBackendEnt) {
    return new RoleRlBackendCUDto(ent);
  }

  //pagination
  async _pagination(pageDto: RoleRlBackendPageDto) {
    return await this.roleRlBackendRepo._paginationEntity(pageDto);
  }

  async deleteBackend(id_backend: string): Promise<SuccessDto> {
    const backendEnt: any = await this.dataSource.manager.findOne(BackendEnt, {
      where: { id: id_backend },
      relations: { role_backend: true },
    });
    if (backendEnt.role_backend.length !== 0)
      await this._delete(backendEnt.role_backend.id);
    await this.backendService._delete(id_backend);
    return new SuccessDto(true);
  }
}
