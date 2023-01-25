import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { CrudFrontendEnum } from 'src/common/translate/enums/crud-frontend.enum';
import { CrudMenuEnum } from 'src/common/translate/enums/crud-menu.enum';
import { RoleEnum } from 'src/common/translate/enums/role.enum';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { RoleService } from 'src/modules/role/modules/services/role.service';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { FrontendEnt } from '../../frontend/entities/frontend.entity';
import { FrontendService } from '../../frontend/services/frontend.service';
import { CreateMenuDto } from '../dtos/create.menu';
import { UpdateMenuDto } from '../dtos/update.menu';
import { MenuEnt } from '../entities/menu.entity';
import { MenuPageDto } from '../pagination/menu.pagination';
import { MenuRepo } from '../repositories/menu.repository';

@Injectable()
export class MenuService extends AbstractServiceClass<
  MenuEnt,
  CreateMenuDto,
  UpdateMenuDto,
  MenuPageDto
> {
  public constructor(
    private menuRepo: MenuRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
    private frontendService: FrontendService,
    private roleService: RoleService,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }
  _resultGetOneDto(ent: MenuEnt) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: MenuEnt) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: MenuEnt) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: MenuEnt) {
    throw new Error('Method not implemented.');
  }

  async _getOne(searchDto: string, options?: FindOneOptions<any>) {
    try {
      return await this.menuRepo._findOneEntity(searchDto, options);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async _create(createDt: CreateMenuDto, query?: QueryRunner) {
    try {
      const exist = await this.findOneByName(createDt.slug_name);
      if (exist) {
        throw new Error(
          `${JSON.stringify({
            section: 'menu',
            value: CrudMenuEnum.CRUD_MENU_NOT_EXISTS,
          })}`,
        );
      }
      if (createDt.id_front) {
        createDt.frontend = await this.frontendService._getOne(
          createDt.id_front,
        );
      }
      createDt.role = await this.roleService.findOneRole(createDt.id_role);
      if (createDt.id_parent)
        createDt.parent = await this._getOne(createDt.id_parent);
      return await this.menuRepo._createEntity(createDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async _delete(searchDto: string, query?: QueryRunner) {
    try {
      const menuEnt: any = await this.dataSource.manager
        .createQueryBuilder(MenuEnt, 'menu')
        .leftJoinAndSelect('menu.children', 'children')
        .where('menu.id = :menu_id', { menu_id: searchDto })
        .getOne();
      return await this.menuRepo._deleteEntity(menuEnt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async _update(menu_Id: string, updateDt: UpdateMenuDto, query?: QueryRunner) {
    try {
      const menuEnt = await this._getOne(menu_Id);
      const frontendEnt = await this.dataSource.manager.findOne(FrontendEnt, {
        where: {
          id: updateDt.id_front,
        },
      });
      if (!frontendEnt)
        throw new Error(
          `${JSON.stringify({
            section: 'crud_frontend',
            value: CrudFrontendEnum.CRUD_FRONTEND_NOT_EXISTS,
          })}`,
        );
      const roleEnt = await this.dataSource.manager.findOne(RoleEnt, {
        where: { id: updateDt.id_role },
      });
      if (!roleEnt)
        throw new Error(
          `${JSON.stringify({
            section: 'role',
            value: RoleEnum.ROLE_NOT_EXISTS,
          })}`,
        );
      updateDt.role = roleEnt;
      updateDt.frontend = frontendEnt;
      return await this.menuRepo._updateEntity(menuEnt, updateDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async _pagination(pageDto: MenuPageDto) {
    try {
      return await this.menuRepo._paginationEntity(pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async findOneByName(slug_name: string) {
    try {
      return await this.menuRepo.findOneByName(slug_name);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      console.log('result', result);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async getMenuTree(id_role: string) {
    try {
      const findRoleDto = {
        id_role: id_role,
      };
      return await this.menuRepo.getMenuTree(findRoleDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async deleteMany(menuEnt: MenuEnt[]) {
    try {
      return await this.menuRepo.deleteMany(menuEnt);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async getAllMenu() {
    return await this.menuRepo.getAllMenu();
  }
}
