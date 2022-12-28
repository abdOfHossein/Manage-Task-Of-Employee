import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { CreateRelTaskDto } from 'src/modules/rel-task/modules/dtos/create.rel-task.dto';
import { RelTaskEnt } from 'src/modules/rel-task/modules/entities/rel-task.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { UpdateTaskDto } from '../dtos/update.task.dto';
import { TaskEnt } from '../entities/task.entity';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TaskMapperPagination } from '../mapper/task.mapper.pagination';
import { ExpiredTaskPageDto } from '../paginations/expired.task.page.dto';
import { ReportTaskPageDto } from '../paginations/report.page.dto';
import { TaskPageDto } from '../paginations/task.page.dto';
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

    if (user_info.Tasks.Task_type == 'USER') {
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
      .leftJoinAndSelect('task.user','user')
      .where('(user.id = :id_user) AND (task.status = :status)', {
       id_user,
        status: reportPage.filter.status,
      })
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
    console.log(result);
    
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
    const department_rl = await this.dataSource.manager.findOne(
      DepartmentRlEnt,
      { where: { id: createDto.id_department_rl } },
    );
    console.log(department_rl);

    const user = await this.dataSource.manager.findOne(UserEnt, {
      where: { id: createDto.id_user },
    });
    console.log(user);
    const taskEnt = new TaskEnt();
    taskEnt.head_id = createDto.head_id;
    taskEnt.priority = createDto.priority;
    taskEnt.tittle = createDto.tittle;
    taskEnt.duration = createDto.duration;
    taskEnt.status = createDto.status;
    taskEnt.type = createDto.type;
    taskEnt.department_rl = department_rl;

    taskEnt.user = user;
    if (query) return await query.manager.save(taskEnt);
    return await this.dataSource.manager.save(taskEnt);
  }

  async createTaskByProject(
    createDto: CreateTaskDto,
    query: QueryRunner | undefined,
  ) {
    const taskEnt = new TaskEnt();
    taskEnt.head_id = createDto.head_id;
    taskEnt.user = createDto.userEnt;
    taskEnt.department_rl = createDto.departmentRlEnt;
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

  async getAll(): Promise<TaskEnt[]> {
    // return await this.dataSource.manager.find(TaskEnt, {relations: ['user']});
    return await this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .innerJoinAndSelect('task.user', 'user')
      .innerJoinAndSelect('task.department_rl', 'department_rl')
      .innerJoinAndSelect('department_rl.req', 'req')
      .innerJoinAndSelect('req.project', 'project')
      .select(['task', 'user', 'department_rl.id', 'req.id', 'project'])
      .getMany();
  }

  async paginationTask(
    id_user: string,
    pageDto: TaskPageDto,
  ): Promise<PageDto<TaskEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .where('task.head_id = :head_id', { head_id: id_user })
      .select([
        'task.id',
        'task.priority',
        'task.tittle',
        'task.head_id',
        'task.type',
        'task.duration',
        'task.status',
      ]);
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.priority) {
        queryBuilder.andWhere('task.priority LIKE :priority', {
          priority: `%${pageDto.filter.priority}%`,
        });
      }
      if (pageDto.filter.tittle) {
        queryBuilder.andWhere('task.tittle LIKE :tittle', {
          tittle: `%${pageDto.filter.tittle}%`,
        });
      }
      if (pageDto.filter.type) {
        queryBuilder.andWhere('task.type LIKE :type', {
          type: `%${pageDto.filter.type}%`,
        });
      }
      if (pageDto.filter.status) {
        queryBuilder.andWhere('task.status LIKE :status', {
          status: `%${pageDto.filter.status}%`,
        });
      }
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

  async createTaskWithIdDepartment(
    id_department: string,
    createDto: CreateTaskDto,
    query: QueryRunner | undefined,
  ): Promise<TaskEnt> {
    const req = await this.dataSource.manager.findOne(ReqEnt, {
      where: { isDefault: true },
    });
    console.log(req);

    const department = await this.dataSource.manager.findOne(DepartmentEnt, {
      where: { id: id_department },
    });
    console.log(department);

    const department_rl = await this.dataSource.manager
      .createQueryBuilder(DepartmentRlEnt, 'department_rl_ent')
      .where(
        'department_rl_ent.department = :department AND department_rl_ent.req = :req',
        { department: department.id, req: req.id },
      )
      .getOne();

    console.log('department_rl in repo', department_rl);

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

  async createTaskWithIdDepartmentAndIdReq(
    id_req: string,
    id_department: string,
    createDto: CreateTaskDto,
    query: QueryRunner | undefined,
  ): Promise<TaskEnt> {
    console.log(id_req);

    let req: ReqEnt;
    if (!id_req) {
      req = await this.dataSource.manager.findOne(ReqEnt, {
        where: { isDefault: true },
      });
      console.log('req1', req);
    }
    req = await this.dataSource.manager.findOne(ReqEnt, {
      where: { id: id_req },
    });
    console.log('req2', req);
    const department = await this.dataSource.manager.findOne(DepartmentEnt, {
      where: { id: id_department },
    });
    console.log(department);

    const department_rl = await this.dataSource.manager
      .createQueryBuilder(DepartmentRlEnt, 'department_rl_ent')
      .where(
        'department_rl_ent.department = :department AND department_rl_ent.req = :req',
        { department: department.id, req: req.id },
      )
      .getOne();

    console.log('department_rl in repo', department_rl);

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

  async forwardTask(
    id_prevoise_task: string,
    createDto: CreateRelTaskDto,
    query: QueryRunner | undefined,
  ) {
    await this.dataSource.manager.update(
      TaskEnt,
      { id: id_prevoise_task },
      { status: StatusTaskEnum.FORWARD },
    );

    const srcTask = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: id_prevoise_task },
    });

    const refTask = new TaskEnt();
    refTask.head_id = createDto.head_id;
    refTask.priority = createDto.priority;
    refTask.tittle = createDto.tittle;
    refTask.duration = createDto.duration;
    refTask.status = createDto.status;
    refTask.type = createDto.type;
    if (query) await query.manager.save(refTask);
    await this.dataSource.manager.save(refTask);

    const taskRlEnt = new RelTaskEnt();
    taskRlEnt.src = srcTask;
    taskRlEnt.ref = refTask;
    taskRlEnt.comment = createDto.comment;
    if (query) return await query.manager.save(taskRlEnt);
    return await this.dataSource.manager.save(taskRlEnt);
  }

  async dailyTask(): Promise<TaskEnt[]> {
    return await this.dataSource.manager.query(
      `select *,(select u.username  from "user" u  where u.id = t."userId") from task as t where DATE(t.do_date) >= CURRENT_DATE AND DATE(t.do_date) < CURRENT_DATE + INTERVAL '1 DAY'      `,
    );
  }

  async createTaskWithIdReqAnddUser(
    id_user: string,
    id_req: string,
    createDto: CreateTaskDto,
    query: QueryRunner | undefined,
  ): Promise<TaskEnt> {
    const user = await this.dataSource.manager.findOne(UserEnt, {
      where: { id: id_user },
    });

    const departments = await this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .where('user.id = :id', { id: id_user })
      .leftJoinAndSelect('user.department', 'department')
      .getMany();
    console.log('departments=>', departments);
    var department_rl = await this.dataSource.manager
      .createQueryBuilder(DepartmentRlEnt, 'department_rl')
      .where(
        'department_rl.req = :id_req AND department_rl.department = :department',
        { id_req, department: departments[0].department.id },
      )
      .getOne();
    const taskEnt = new TaskEnt();
    taskEnt.head_id = createDto.head_id;
    taskEnt.priority = createDto.priority;
    taskEnt.tittle = createDto.tittle;
    taskEnt.duration = createDto.duration;
    taskEnt.status = createDto.status;
    taskEnt.type = createDto.type;
    taskEnt.user = user;
    taskEnt.department_rl = department_rl;
    if (query) return await query.manager.save(taskEnt);
    return await this.dataSource.manager.save(taskEnt);
  }
}
