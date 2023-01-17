import { Injectable } from '@nestjs/common';

import { HandlerError } from 'src/common/class/handler.error';
import { SuccessDto } from 'src/common/result/success.dto';
import { MenuEnum } from 'src/common/translate/enums/menu.enum';
import { RoleService } from 'src/modules/role/modules/services/role.service';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { FrontendService } from '../../frontend/services/frontend.service';
import { CreateMenuDto } from '../dtos/create.menu';
import { UpdateMenuDto } from '../dtos/update.menu';
import { MenuEnt } from '../entities/menu.entity';
import { MenuPageDto } from '../pagination/menu.pagination';
import { MenuRepo } from '../repositories/menu.repository';
import { MenuCUDto } from '../results/menu.c.u.dto';
import { MenuGDto } from '../results/menu.g.dto';

@Injectable()
export class MenuService {
  constructor(
    private menuRepo: MenuRepo,
    private handlerService: HandlerService,
    private dataSource: DataSource,
    private frontendService: FrontendService,
    private roleService: RoleService,
  ) {}

   async _getOne(searchDto: string, options?: FindOneOptions<any>) {
    return await this.menuRepo._findOneEntity(searchDto, options);
  }
  _resultGetOneDto(ent: MenuEnt) {
    return new MenuGDto(ent);
  }
   async _create(createDt: CreateMenuDto, query?: QueryRunner) {
    const exist = await this.findOneByName(createDt.slug_name);
    if (exist) {
      throw new Error(
        `${JSON.stringify({
          section: 'menu',
          value: MenuEnum.MENU_ALREADY_EXISTS,
        })}`,
      );
    }
    createDt.frontend = await this.frontendService._getOne(createDt.id_front);
    createDt.role = await this.roleService.findOneRole(createDt.id_role);
    if (createDt.id_parent)
      createDt.parent = await this._getOne(createDt.id_parent);
    return await this.menuRepo._createEntity(createDt, query);
  }
  _resultCreateDto(ent: MenuEnt) {
    return new MenuCUDto(ent);
  }
   async _delete(searchDto: string, query?: QueryRunner) {
    const menuEnt = await this._getOne(searchDto);
    return await this.menuRepo._deleteEntity(menuEnt, query);
  }
  _resultDeleteDto(ent: MenuEnt) {
    return new SuccessDto(true);
  }
   async _update(
    menu_Id: string,
    updateDt: UpdateMenuDto,
    query?: QueryRunner,
  ) {
    const menuEnt = await this._getOne(menu_Id);
    return await this.menuRepo._updateEntity(menuEnt, updateDt, query);
  }
  _resultUpdateDto(ent: MenuEnt) {
    return new MenuCUDto(ent);
  }
   async _pagination(pageDto: MenuPageDto) {
    return await this.menuRepo._paginationEntity(pageDto);
  }

  async findOneByName(slug_name: string) {
    return await this.menuRepo.findOneByName(slug_name);
  }

  async getMenuTree(id_role: string) {
    try {
      const findRoleDto = {
        id_role: id_role,
      };
      return await this.menuRepo.getMenuTree(findRoleDto);
    } catch (e) {
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
  async deleteMany(menuEnt: MenuEnt[]) {
    return await this.menuRepo.deleteMany(menuEnt);
  }
}
