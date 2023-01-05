import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { ConfigRoleDto } from '../dtos/config.roele.dto';
import { CreateRoleDto } from '../dtos/create.role.dto';
import { RoleEnt } from '../entities/role.entity';
import { RoleMapperPagination } from '../mapper/role.mapper.pagination';
import { RolePageDto } from '../paginations/role.page.dto';

export class RoleRepo {
  constructor(
    @InjectRepository(RoleEnt)
    private dataSource: DataSource,
  ) {}

  async createRole(
    createDto: CreateRoleDto,
    query: QueryRunner | undefined,
  ): Promise<RoleEnt> {
    const roleEnt = new RoleEnt();
    roleEnt.role_type = createDto.role_type;
    if (query) return await query.manager.save(roleEnt);
    return await this.dataSource.manager.save(roleEnt);
  }

  async findOneRole(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<RoleEnt> {
    const result = await this.dataSource.manager.findOne(RoleEnt, {
      where: { id: searchDto },
    });
    if (!result)
      throw new BadGatewayException({ message: 'Role does not exits' });
    return result;
  }

  async paginationRole(pageDto: RolePageDto): Promise<PageDto<RoleEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(RoleEnt, 'role')
      .select(['role.id', 'role.role_type']);
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.role_type) {
        queryBuilder.andWhere('role.role_type LIKE :role_type', {
          role_type: `%${pageDto.filter.role_type}%`,
        });
      }
    }
    if (pageDto.field) {
      const mapper = RoleMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${RoleMapperPagination[pageDto.field]}`,
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

  async findAllRole(): Promise<RoleEnt[]> {
    const result = await this.dataSource.manager.find(RoleEnt);
    console.log(result);
    return result;
  }

  async configRole(
    id_user: string,
    configRoleDto: ConfigRoleDto,
    query?: QueryRunner,
  ): Promise<UserEnt> {
    let roles:any = [];
    for (const roel_id of configRoleDto.id_roles) {
      const role = await this.dataSource.manager.findOne(RoleEnt, {
        where: { id: roel_id },
      });
      roles.push(role);
    }

    const user = await this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .leftJoinAndSelect('user.role', 'role')
      .where('users.id = :id_user', { id_user })
      .getOne()
      user.role=roles
    if (query) return await query.manager.save(user);
    return await this.dataSource.manager.save(user);
  }

  
  async deleteRole(
    id_role: string,
    query?: QueryRunner,
  ): Promise<RoleEnt> {
    const roleEnt = await this.dataSource.manager.findOne(RoleEnt, {
      where: { id: id_role },
    });
    roleEnt.delete_at = new Date();
    return await this.dataSource.manager.save(roleEnt);
  }
}
