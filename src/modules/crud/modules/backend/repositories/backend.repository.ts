import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepositoryClass } from 'src/common/abstract/abstract.repository.class';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateBackendDto } from '../dtos/create.backend.dto';
import { UpdateBackendDto } from '../dtos/update.backend.dto';
import { BackendEnt } from '../entities/backend.entity';
import { BackendMapperPagination } from '../mapper/backend.mapper.pagination';
import { BackendPageDto } from '../pagination/backend.page.dto';

export class BackendRepo extends AbstractRepositoryClass<
  BackendEnt,
  CreateBackendDto,
  UpdateBackendDto,
  BackendPageDto
> {
  
  constructor(
    @InjectRepository(BackendEnt)
    dataSource: DataSource,
    handlerService: HandlerService,
  ) {
    super(dataSource, handlerService);
  }

  async _findOneEntity(
    searchDto: string,
    options?: FindOneOptions<any>,
  ): Promise<BackendEnt> {
    return await this.dataSource.manager.findOne(BackendEnt, {
      where: { id: searchDto },
      relations: ['role_backend'],
    });
  }
  async _createEntity(
    createDto: CreateBackendDto,
    query?: QueryRunner,
  ): Promise<BackendEnt> {
    const backendEnt = new BackendEnt();
    backendEnt.slug_name = createDto.slug_name;
    backendEnt.route = createDto.route;
    backendEnt.method = createDto.method;
    backendEnt.query = createDto.query;
    backendEnt.body = createDto.body;
    if (query) return await query.manager.save(backendEnt);
    return await this.dataSource.manager.save(backendEnt);
  }
  async _updateEntity(
    entity: BackendEnt,
    updateDto: UpdateBackendDto,
    query?: QueryRunner,
  ): Promise<BackendEnt> {
    entity.slug_name = updateDto.slug_name;
    entity.route = updateDto.route;
    entity.method = updateDto.method;
    entity.query = updateDto.query;
    entity.body = updateDto.body;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }
  async _deleteEntity(
    entity: BackendEnt,
    query?: QueryRunner,
  ): Promise<BackendEnt> {
    if (query) return await query.manager.remove(entity);
    return await this.dataSource.manager.remove(entity);
  }
  async _paginationEntity(
    pageDto: BackendPageDto,
  ): Promise<PageDto<BackendEnt>> {
    const queryBuilder = this.dataSource.manager.createQueryBuilder(
      BackendEnt,
      'backend',
    );
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.slug_name) {
        queryBuilder.where('backend.slug_name LIKE :slug_name', {
          slug_name: `%${pageDto.filter.slug_name}%`,
        });
      }
      if (pageDto.filter.route) {
        queryBuilder.where('backend.route LIKE :route', {
          route: `%${pageDto.filter.route}%`,
        });
      }
    }
    if (pageDto.field) {
      const mapper = BackendMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Route Already Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${BackendMapperPagination[pageDto.field]}`,
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

  async findOneByRoute(route: string): Promise<BackendEnt> {
    return await this.dataSource.manager.findOne(BackendEnt, {
      where: { route: route },
    });
  }
}
