import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateProjectDto } from '../dtos/create.project.dto';
import { UpdateProjectDto } from '../dtos/update.project.dto';
import { ProjectEnt } from '../entities/project.entity';
import { ProjectMapperPagination } from '../mapper/project.mapper.pagination';
import { ProjectPageDto } from '../paginations/project.page.dto';

export class ProjectRepo {
  constructor(
    @InjectRepository(ProjectEnt)
    private dataSource: DataSource,
  ) {}

  async createProject(
    createDto: CreateProjectDto,
    query: QueryRunner | undefined,
  ): Promise<ProjectEnt> {
    const projectEnt = new ProjectEnt();
    projectEnt.project_name = createDto.project_name;
    if (query) return await query.manager.save(projectEnt);
    return await this.dataSource.manager.save(projectEnt);
  }

  async findOneProject(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<ProjectEnt> {
    const project = await this.dataSource.manager.findOne(ProjectEnt, {
      where: { id: searchDto },
    });
    if (!project)
      throw new BadGatewayException({ message: 'Project does not exits' });
    return project;
  }

  async updateProject(
    entity: ProjectEnt,
    updateDto: UpdateProjectDto,
    query?: QueryRunner,
  ): Promise<ProjectEnt> {
    entity.project_name = updateDto.project_name;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async paginationProject(
    pageDto: ProjectPageDto,
  ): Promise<PageDto<ProjectEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(ProjectEnt, 'project')
      .innerJoin('project.reqs', 'req')
      .innerJoin('req.department_rls', 'department_rl')
      // .innerJoinAndSelect('department_rl.department', 'department')
      // .innerJoinAndSelect('department.users', 'user')

    console.log(await queryBuilder.getMany());
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }

    if (pageDto.filter) {
      if (pageDto.filter.project_name)
        queryBuilder.andWhere('project.project_name LIKE :project_name', {
          project_name: `%${pageDto.filter.project_name}%`,
        });
    }
    if (pageDto.field) {
      const mapper = ProjectMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${ProjectMapperPagination[pageDto.field]}`,
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
