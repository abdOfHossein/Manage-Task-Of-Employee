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
import { ExpiredTaskPageDto } from '../paginations/expired.task.page.dto';
import { ReportTaskPageDto } from '../paginations/report.page.dto';
import { TaskTypePageDto } from '../paginations/task.type.page.dto';

export class TaskRepo {
  constructor(
    @InjectRepository(TaskEnt)
    private dataSource: DataSource,
  ) {}

  async checkExpirationTask(
    user_info: any,
    expiredTaskPageDto: ExpiredTaskPageDto,
    query: QueryRunner | undefined,
  ): Promise<PageDto<TaskEnt>> {
    const queryBuilder = this.dataSource.manager.createQueryBuilder(
      TaskEnt,
      'task',
    );

    if (user_info.roles.role_type == 'USER') {
      console.log('here');
      queryBuilder.where('task.head_id = :head_id', {
        head_id: user_info.id_User,
      });
    }
    queryBuilder
      // .where(`task.create_at > ( NOW() - new Date((task.create_at).setDate((task.create_at).getDay()+ task.duration))`)
      .select([
        'task.id',
        'task.tittle',
        'task.priority',
        'task.head_id',
        'task.type',
        'task.status',
      ]);
    console.log(await queryBuilder.getMany());

    if (expiredTaskPageDto.base) {
      const row = expiredTaskPageDto.base.row;
      const skip = PublicFunc.skipRow(
        expiredTaskPageDto.base.page,
        expiredTaskPageDto.base.row,
      );
      queryBuilder.skip(skip).take(row);
    }
    if (expiredTaskPageDto.filter) {
    }
    if (expiredTaskPageDto.field) {
      const mapper = TaskMapperPagination[expiredTaskPageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${TaskMapperPagination[expiredTaskPageDto.field]}`,
        expiredTaskPageDto.base.order,
      );
    }
    const result = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      baseOptionsDto: expiredTaskPageDto.base,
      itemCount: result[1],
    });
    console.log(result[0]);

    return new PageDto(result[0], pageMetaDto);
  }

  async taskTypePagination(
    id_user: string,
    reportPage: TaskTypePageDto,
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
      if (reportPage.filter.type)
        queryBuilder.andWhere('Task.type LIKE :type', {
          type: `%${reportPage.filter.type}%`,
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

  async paginationTask(): Promise<TaskEnt[]> {
    return await this.dataSource.manager.find(TaskEnt, {});
  }
}
