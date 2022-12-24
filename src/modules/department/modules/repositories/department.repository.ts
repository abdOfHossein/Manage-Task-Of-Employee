import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateDepartmentDto } from '../dtos/create.department.dto';
import { UpdateDepartmentDto } from '../dtos/update.department.dto';
import { DepartmentEnt } from '../entities/department.entity';
import { DepartmentMapperPagination } from '../mapper/department.mapper.pagination';
import { DepartmentPageDto } from '../paginations/department.page.dto';

export class DepartmentRepo {
  constructor(
    @InjectRepository(DepartmentEnt)
    @InjectRepository(DepartmentRlEnt)
    @InjectRepository(ReqEnt)
    private dataSource: DataSource,
  ) {}

  async createDepartment(
    createDto: CreateDepartmentDto,
    query: QueryRunner | undefined,
  ): Promise<DepartmentEnt> {
    const departmentEnt = new DepartmentEnt();
    departmentEnt.header_id = createDto.header_id;
    departmentEnt.name_department = createDto.name_department;
    if (query) return await query.manager.save(departmentEnt);
    const result = await this.dataSource.manager.save(departmentEnt);
    const reqs = await this.dataSource.manager.find(ReqEnt,{});
    console.log(reqs);
    
    for (const req of reqs) {
      const departmentRl = this.dataSource
        .manager
        .create(DepartmentRlEnt,{
          req,
          department: result,
        });
      await this.dataSource.manager.save(departmentRl);
    }
    return result;
  }

  async getAllDepartment() {
    return await this.dataSource.manager.createQueryBuilder(DepartmentEnt, 'department').getMany();
  }

  async getDepartmentUsers(id_department:string) {
    return await this.dataSource.manager.createQueryBuilder(DepartmentEnt,'department')
    .innerJoinAndSelect('department.users', 'users')
    .where('department.id = :id_department', {
      id_department
    })
    .getMany()
  }

  async findOneDepartment(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<DepartmentEnt> {
    const department = await this.dataSource.manager.findOne(DepartmentEnt, {
      where: { id: searchDto },
    });
    if (!department)
      throw new BadGatewayException({ message: 'department does not exits' });
    return department;
  }

  async updateDepartment(
    entity: DepartmentEnt,
    updateDto: UpdateDepartmentDto,
    query?: QueryRunner,
  ): Promise<DepartmentEnt> {
    entity.header_id = updateDto.header_id;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async paginationDepartment(
    pageDto: DepartmentPageDto,
  ): Promise<PageDto<DepartmentEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(DepartmentEnt, 'department')
      .select([
        'department.id',
        'department.header_id',
        'department.name_department',
      ]);
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }

    if (pageDto.filter) {
      if (pageDto.filter.header_id) {
        queryBuilder.andWhere('department.header_id LIKE :header_id', {
          header_id: `%${pageDto.filter.header_id}%`,
        });
      }
    }
    if (pageDto.field) {
      const mapper = DepartmentMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${DepartmentMapperPagination[pageDto.field]}`,
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
