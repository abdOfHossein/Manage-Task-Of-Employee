import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateDepartmentRlDto } from '../dtos/create.department-rl.dto';
import { UpdateDepartmentRlDto } from '../dtos/update.department-rl.dto';
import { DepartmentRlEnt } from '../entities/department-rl.entity';
import { DepartmentRlMapperPagination } from '../mapper/department-rl.mapper.pagination';
import { DepartmentRlPageDto } from '../paginations/department-rl.page.dto';

export class DepartmentRlRepo {
  constructor(
    @InjectRepository(DepartmentRlEnt)
    @InjectRepository(ReqEnt)
    @InjectRepository(DepartmentEnt)
    private dataSource: DataSource,
  ) {}

  async createDepartmentRl(
    createDto: CreateDepartmentRlDto,
    query: QueryRunner | undefined,
  ): Promise<DepartmentRlEnt> {
    const departmentRlEnt = new DepartmentRlEnt();
    departmentRlEnt.req = createDto.reqEnt;
    departmentRlEnt.department = createDto.departmentEnt;
    if (query) return await query.manager.save(departmentRlEnt);
    return await this.dataSource.manager.save(departmentRlEnt);
  }

  async findOneDepartmentRl(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<DepartmentRlEnt> {
    const DepartmentRl = await this.dataSource.manager.findOne(
      DepartmentRlEnt,
      {
        where: { id: searchDto },
      },
    );
    if (!DepartmentRl)
      throw new BadGatewayException({ message: 'DepartmentRl does not exits' });
    return DepartmentRl;
  }

  async findByDepartmentRequest(
    id_req: string,
    id_department: string,
    options?: FindOneOptions,
  ): Promise<DepartmentRlEnt> {
    const queryBuilder = await this.dataSource.manager
      .createQueryBuilder(DepartmentRlEnt, 'departmentRl')
      .innerJoinAndSelect('departmentRl.department', 'department')
      .innerJoinAndSelect('department.user', 'user')
      .innerJoinAndSelect('departmentRl.req', 'req')
      .where('user.id = : id_user AND req.id = :id_req', {
        id_req,
        id_department,
      })
      .getOne();
    if (!queryBuilder)
      throw new BadGatewayException({ message: 'DepartmentRl does not exits' });
    return queryBuilder;
  }

  async updateDepartmentRl(
    entity: DepartmentRlEnt,
    updateDto: UpdateDepartmentRlDto,
    query?: QueryRunner,
  ): Promise<DepartmentRlEnt> {
    updateDto.reqEnt = await this.dataSource.manager.findOne(ReqEnt, {
      where: { id: updateDto.req_id },
    });
    updateDto.departmentEnt = await this.dataSource.manager.findOne(
      DepartmentEnt,
      { where: { id: updateDto.department_id } },
    );
    entity.req = updateDto.reqEnt;
    entity.department = updateDto.departmentEnt;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async paginationDepartmentRl(
    pageDto: DepartmentRlPageDto,
  ): Promise<PageDto<DepartmentRlEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(DepartmentRlEnt, 'department_rl')
      .select(['department_rl.id']);
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.field) {
      const mapper = DepartmentRlMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${DepartmentRlMapperPagination[pageDto.field]}`,
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
}
