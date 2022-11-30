import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { UpdateTaskDto } from '../dtos/update.task.dto';
import { TaskEnt } from '../entities/task.entity';
import { TaskMapperPagination } from '../mapper/task.mapper.pagination';
import { ReportTaskPageDto } from '../paginations/report.page.dto';
import { TaskPageDto } from '../paginations/task.page.dto';

export class TaskRepo {
  constructor(
    @InjectRepository(TaskEnt)
    private dataSource: DataSource,
  ) {}

  async getReportTask(
    id_user: string,
    reportPage: ReportTaskPageDto,
    query: QueryRunner | undefined,
  ): Promise<PageDto<TaskEnt>> {
    console.log(id_user);
    
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .where('task.head_id = :head_id', { head_id: id_user })
      .select([
        'task.id',
        'task.tittle',
        'task.priority',
        'task.head_id',
        'task.type',
        'task.status',
      ]);
    console.log(await queryBuilder.getMany());

    if (reportPage.base) {
      const row = reportPage.base.row;
      const skip = PublicFunc.skipRow(
        reportPage.base.page,
        reportPage.base.row,
      );
      queryBuilder.skip(skip).take(row);
    }
    if (reportPage.filter) {
      if (reportPage.filter.status)
        queryBuilder.andWhere('Task.status LIKE :status', {
          status: `%${reportPage.filter.status}%`,
        });
    }
    if (reportPage.field) {
      const mapper = TaskMapperPagination[reportPage.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${TaskMapperPagination[reportPage.field]}`,
        reportPage.base.order,
      );
    }
    const result = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      baseOptionsDto: reportPage.base,
      itemCount: result[1],
    });
    console.log(result[0]);

    return new PageDto(result[0], pageMetaDto);
  }

  async createTask(
    createDto: CreateTaskDto,
    query: QueryRunner | undefined,
  ): Promise<TaskEnt> {
    const taskEnt = new TaskEnt();
    taskEnt.head_id = createDto.head_id;
    taskEnt.priority = createDto.priority;
    taskEnt.tittle = createDto.tittle;
    taskEnt.duration = createDto.duration;
    taskEnt.status = createDto.status;
    taskEnt.type = createDto.type;
    if (query) return await query.manager.save(taskEnt);
    return await this.dataSource.manager.save(taskEnt);
  }

  async findOneTask(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<TaskEnt> {
    const task = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: searchDto },
    });
    if (!task)
      throw new BadGatewayException({ message: 'Task does not exits' });
    return task;
  }

  async updateTask(
    entity: TaskEnt,
    updateDto: UpdateTaskDto,
    query?: QueryRunner,
  ): Promise<TaskEnt> {
    entity.head_id = updateDto.head_id;
    entity.priority = updateDto.priority;
    entity.tittle = updateDto.tittle;
    entity.duration = updateDto.duration;
    entity.status = updateDto.status;
    entity.type = updateDto.type;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async paginationTask(pageDto: TaskPageDto): Promise<PageDto<TaskEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .select([
        'task.id',
        'task.tittle',
        'task.priority',
        'task.head_id',
        'task.type',
        'task.status',
      ]);
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }

    if (pageDto.filter) {
      if (pageDto.filter.tittle)
        queryBuilder.andWhere('Task.tittle LIKE :tittle', {
          tittle: `%${pageDto.filter.tittle}%`,
        });
      if (pageDto.filter.priority)
        queryBuilder.andWhere('Task.priority LIKE :priority', {
          priority: `%${pageDto.filter.priority}%`,
        });
      if (pageDto.filter.head_id)
        queryBuilder.andWhere('Task.head_id LIKE :head_id', {
          head_id: `%${pageDto.filter.head_id}%`,
        });
      if (pageDto.filter.type)
        queryBuilder.andWhere('Task.type LIKE :type', {
          type: `%${pageDto.filter.type}%`,
        });
      if (pageDto.filter.status)
        queryBuilder.andWhere('Task.status LIKE :status', {
          status: `%${pageDto.filter.status}%`,
        });
    }
    if (pageDto.field) {
      const mapper = TaskMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${TaskMapperPagination[pageDto.field]}`,
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
