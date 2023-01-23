import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { PublicEnum } from 'src/common/translate/enums/public.enum';
import { FindRoleDto } from 'src/modules/role/modules/dtos/find.role.dto';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateMenuDto } from '../dtos/create.menu';
import { UpdateMenuDto } from '../dtos/update.menu';
import { MenuEnt } from '../entities/menu.entity';
import { MenuMapperPagination } from '../mapper/menu.mapper.pagination';
import { MenuPageDto } from '../pagination/menu.pagination';

export class MenuRepo {
  constructor(
    @InjectRepository(MenuEnt)
    private dataSource: DataSource,
    private handlerService: HandlerService,
  ) {}

  async _findOneEntity(
    searchDto: string,
    options?: FindOneOptions<any>,
  ): Promise<MenuEnt> {
    return await this.dataSource.manager.findOne(MenuEnt, {
      where: { id: searchDto },
    });
  }
  async _createEntity(
    createDto: CreateMenuDto,
    query?: QueryRunner,
  ): Promise<MenuEnt> {
    const menuEnt = new MenuEnt();
    menuEnt.base_order = createDto.base_order;
    menuEnt.slug_name = createDto.slug_name;
    menuEnt.parent = createDto.parent;
    menuEnt.frontend = createDto.frontend;
    menuEnt.role = createDto.role;
    menuEnt.parent = createDto.parent;
    if (query) return await query.manager.save(menuEnt);
    return await this.dataSource.manager.save(menuEnt);
  }
  async _updateEntity(
    entity: MenuEnt,
    updateDto: UpdateMenuDto,
    query?: QueryRunner,
  ): Promise<MenuEnt> {
    entity.base_order = updateDto.base_order;
    entity.slug_name = updateDto.slug_name;
    entity.parent = updateDto.parent;
    entity.frontend = updateDto.frontend;
    entity.role = updateDto.role;
    entity.parent = updateDto.parent;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }
  async _deleteEntity(
    entity: MenuEnt,
    query?: QueryRunner,
  ): Promise<MenuEnt | any> {
    await this.dataSource.manager.softDelete(MenuEnt, entity[0].children);
    await this.dataSource.manager.softDelete(MenuEnt, entity);
    return entity;
  }
  async _paginationEntity(
    pageDto: MenuPageDto,
    id_parent?: string,
  ): Promise<PageDto<MenuEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(MenuEnt, 'menu')
      .leftJoinAndSelect('menu.frontend', 'frontend')
      .leftJoinAndSelect('menu.role', 'role')
      .select([
        'menu.id',
        'menu.slug_name',
        'menu.base_order',
        'frontend.id',
        'role.id',
      ]);

    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.base_order) {
        queryBuilder.andWhere('menu.base_order LIKE :base_order', {
          base_order: `%${pageDto.filter.base_order}%`,
        });
      }
      if (pageDto.filter.slug_name != null) {
        queryBuilder.orWhere('(menu.slug_name LIKE :slug_name)', {
          slug: `${pageDto.filter.slug_name}`,
        });
      }
      if (pageDto.filter.id_role != null) {
        queryBuilder.andWhere('(role.id = :id_role)', {
          id_role: pageDto.filter.id_role,
        });
      }
       
      if (pageDto.filter.parent == null || pageDto.filter.parent.length==0) {
        queryBuilder.andWhere('(menu.parent IS NULL)');
      }
      if (pageDto.filter.parent != null && pageDto.filter.parent.length>0) {
        queryBuilder.andWhere('(menu.parent = :parent)', {
          parent: pageDto.filter.parent,
        });
      }

      // queryBuilder.andWhere('(:parent=null or Length(:parent)=0  or (menu.parent = :parent)', {
      //   parent: pageDto.filter!.parent!,
      // });

    } else {
      queryBuilder.andWhere('menu.parent IS NULL');
    }
    if (pageDto.field) {
      const mapper = MenuMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: PublicEnum.COLUMN_NOT_EXISTS,
          })}`,
        );
      queryBuilder.addOrderBy(
        `${MenuMapperPagination[pageDto.field]}`,
        pageDto.base.order,
      );
    }
    const result = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      baseOptionsDto: pageDto.base,
      itemCount: result[1],
    });
    return new PageDto(result[0], pageMetaDto);
  }

  async findOneByName(slug_name: string) {
    return await this.dataSource.manager.findOne(MenuEnt, {
      where: { slug_name: slug_name },
    });
  }

  async getMenuTree(findRoleDto: FindRoleDto): Promise<MenuEnt[]> {
    const queryBuilder = this.dataSource.manager
      .getTreeRepository(MenuEnt)
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.children', 'child')
      .leftJoinAndSelect('child.role', 'child_role')
      .leftJoinAndSelect('menu.role', 'role')
      .leftJoinAndSelect('menu.frontend', 'frontend')
      .leftJoinAndSelect('child.frontend', 'child_frontend')
      .where('role.id=:role_id', { role_id: findRoleDto.id_role })
      .andWhere('menu.parent IS NULL')
      .orderBy('menu.base_order', 'ASC')
      .addOrderBy('child.base_order', 'ASC')
      .select([
        'menu.id',
        'menu.slug_name',
        'menu.base_order',
        'child.id',
        'child.slug_name',
        'child_frontend.slug_name',
        'child_frontend.route',
        'child.base_order',
        'menu.parent',
        'frontend.slug_name',
        'frontend.route',
      ]);
    return await queryBuilder.getMany();
  }

  async deleteMany(menuEnt: MenuEnt[], query?: QueryRunner) {
    if (query) return await query.manager.remove(menuEnt);
    return await this.dataSource.manager.remove(menuEnt);
  }

  async getAllMenu() {
    return await this.dataSource.manager.find(MenuEnt);
  }
}
