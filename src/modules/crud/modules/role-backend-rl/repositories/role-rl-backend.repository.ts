import { PublicEnum } from 'src/common/translate/enums/public.enum';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateRoleRlBackendDto } from '../dtos/create-role-rl-backend.dto';
import { UpdateRoleRlBackendDto } from '../dtos/update-role-rl-backend.dto';
import { RoleRlBackendEnt } from '../entities/role-rl-backend.entity';
import { CountryMapperPagination } from '../mapper/country.mapper.pagination';
import { RoleRlBackendPageDto } from '../pagination/country.page.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class RoleRlBackendRepo {
  constructor(
    @InjectRepository(RoleRlBackendEnt)
    private dataSource: DataSource,
    private handlerService: HandlerService,
  ) {}

  async _findOneEntity(
    searchDto: string,
    options?: FindOneOptions<any>,
  ): Promise<RoleRlBackendEnt> {
    return await this.dataSource.manager.findOne(RoleRlBackendEnt, {
      where: { id: searchDto },
      relations: ['backend'],
    });
  }
  async _createEntity(
    createDto: CreateRoleRlBackendDto,
    query?: QueryRunner,
  ): Promise<RoleRlBackendEnt> {
    const roleRlBackendEnt = new RoleRlBackendEnt();
    roleRlBackendEnt.backend = createDto.backend;
    roleRlBackendEnt.role = createDto.role;
    if (query) await query.manager.save(roleRlBackendEnt);
    return await this.dataSource.manager.save(roleRlBackendEnt);
  }
  async _updateEntity(
    entity: RoleRlBackendEnt,
    updateDto: UpdateRoleRlBackendDto,
    query?: QueryRunner,
  ): Promise<RoleRlBackendEnt> {
    entity.backend = updateDto.backend;
    entity.role = updateDto.role;
    if (query) await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }
  async _deleteEntity(
    entity: RoleRlBackendEnt,
    query?: QueryRunner,
  ): Promise<RoleRlBackendEnt> {
    if (query) await query.manager.remove(entity);
    return await this.dataSource.manager.remove(entity);
  }

  //pagination
  async _paginationEntity(
    pageDto: RoleRlBackendPageDto,
  ): Promise<PageDto<RoleRlBackendEnt>> {
    console.log(11111);

    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(RoleRlBackendEnt, 'role_rl_backend')
      .select(['role_rl_backend.id']);
    console.log(22222222);
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }

    // if (pageDto.filter) {
    //   if (pageDto.filter.id) {
    //     queryBuilder.andWhere('arch.slug_arch LIKE :slug_arch', {
    //       slug_arch: `%${pageDto.filter.slug_arch}%`,
    //     });
    //   }

    // }
    console.log(333333333);
    if (pageDto.field) {
      const mapper = CountryMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: PublicEnum.COLUMN_NOT_EXISTS,
          })}`,
        );
      queryBuilder.addOrderBy(
        `${CountryMapperPagination[pageDto.field]}`,
        pageDto.base.order,
      );
    }
    console.log(444444444);

    const result = await queryBuilder.getManyAndCount();
    console.log('result', result);

    const pageMetaDto = new PageMetaDto({
      baseOptionsDto: pageDto.base,
      itemCount: result[1],
    });

    console.log('pageMetaDto', pageMetaDto);
    console.log(555555555);
    const a = new PageDto(result[0], pageMetaDto);
    console.log('result[0]', result[0]);
    console.log(a);
    console.log(66666666666);
    return a;
  }
}
