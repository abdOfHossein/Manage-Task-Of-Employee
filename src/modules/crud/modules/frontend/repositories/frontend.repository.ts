import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateFrontendDto } from '../dtos/create.frontend.dto';
import { UpdateFrontendDto } from '../dtos/update.frontend.dto';
import { FrontendEnt } from '../entities/frontend.entity';
import { FrontendMapperPagination } from '../mapper/frontend.mapper.pagination';
import { FrontendPageDto } from '../pagination/frontend.page.dto';

export class FrontendRepo {
  constructor(
    @InjectRepository(FrontendEnt)
    private dataSource: DataSource,
  ) {}

  async _paginationEntity(
    pageDto: FrontendPageDto,
  ): Promise<PageDto<FrontendEnt>> {
    const queryBuilder = this.dataSource.manager.createQueryBuilder(
      FrontendEnt,
      'frontend',
    );
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.slug_name) {
        queryBuilder.andWhere('frontend.slug_name LIKE :slug_name', {
          slug_name: `%${pageDto.filter.slug_name}%`,
        });
      }
    }
    if (pageDto.field) {
      const mapper = FrontendMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Route Already Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${FrontendMapperPagination[pageDto.field]}`,
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
  async _findOneEntity(
    searchDto: string,
    options?: FindOneOptions<any>,
  ): Promise<FrontendEnt> {
    return await this.dataSource.manager.findOne(FrontendEnt, {
      where: { id: searchDto },
      relations: ['menu'],
    });
  }
  async _createEntity(
    createDto: CreateFrontendDto,
    query?: QueryRunner,
  ): Promise<FrontendEnt> {
    const frontendEnt = new FrontendEnt();
    frontendEnt.slug_name = createDto.slug_name;
    frontendEnt.route = createDto.route;
    frontendEnt.description = createDto.description;
    frontendEnt.host = createDto.host;
    frontendEnt.type_platform = createDto.type_platform;
    if (query) return await query.manager.save(frontendEnt);
    return await this.dataSource.manager.save(frontendEnt);
  }

  async _updateEntity(
    entity: FrontendEnt,
    updateDto: UpdateFrontendDto,
    query?: QueryRunner,
  ): Promise<FrontendEnt> {
    entity.slug_name = updateDto.slug_name;
    entity.route = updateDto.route;
    entity.description = updateDto.description;
    entity.host = updateDto.host;
    entity.type_platform = updateDto.type_platform;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async _deleteEntity(
    entity: FrontendEnt,
    query?: QueryRunner,
  ): Promise<FrontendEnt> {
    entity.delete_at = new Date();
    entity.slug_name = 'deleted' + '_' + entity.slug_name;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async findByRoute(route: string) {
    return await this.dataSource.manager.findOne(FrontendEnt, {
      where: { route },
    });
  }

  async getAll() {
    return await this.dataSource.manager.find(FrontendEnt, {
      where: {},
    });
  }
}
