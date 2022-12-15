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
import { TaskEnt } from "../../../task/modules/entities/task.entity";
import { DepartmentRlEnt } from "../../../department-rl/modules/entities/department-rl.entity";
import { ReqEnt } from "../../../req/modules/entities/req.entity";

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
    entity.file = updateDto.file;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async paginationProject(
    pageDto: ProjectPageDto,
  ): Promise<PageDto<ProjectEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(ProjectEnt, 'project')
      .leftJoin('project.reqs', 'req')
      .leftJoin('req.department_rls', 'department_rls')
      .leftJoin('department_rls.tasks', 'tasks')
      .select(['project.id', 'project_name'])
      .addSelect('COUNT(DISTINCT(req.id))', 'req')
      .addSelect('COUNT(DISTINCT(tasks.id))', 'tasks')
      .groupBy('project.id')
    console.log(await queryBuilder.getRawAndEntities());
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
    const result = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({
      baseOptionsDto: pageDto.base,
      itemCount: result.entities.length,
    });
    return new PageDto(result.raw, pageMetaDto);
  }
}
