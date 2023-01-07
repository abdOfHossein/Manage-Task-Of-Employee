import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { DepartmentRlService } from 'src/modules/department-rl/modules/services/department-rl.service';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { ProjectService } from 'src/modules/project/modules/services/project.service';
import { CreateRelTaskDto } from 'src/modules/rel-task/modules/dtos/create.rel-task.dto';
import { RelTaskEnt } from 'src/modules/rel-task/modules/entities/rel-task.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { StatusReqEnum } from 'src/modules/req/modules/enums/req.enum';
import { ReqService } from 'src/modules/req/modules/services/req.service';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { CreateTaskWithIdUserIdReqDto } from '../dtos/create.task.withIdUserIdReq.dto';
import { UpdateCheckStatusTaskDto } from '../dtos/update.check-status.dto';
import { UpdateTaskDto } from '../dtos/update.task.dto';
import { TaskEnt } from '../entities/task.entity';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';
import { TaskMapperPagination } from '../mapper/task.mapper.pagination';
import { ReportTaskPageDto } from '../paginations/report.page.dto';
import { TaskPageDto } from '../paginations/task.page.dto';
import { TaskTypeStatusPageDto } from '../paginations/task.status-type.page.dto';
import { TaskTypePageDto } from '../paginations/task.type.page.dto';

export class TaskRepo {
  constructor(
    private departmentRlService: DepartmentRlService,
    private projectService: ProjectService,
    private reqService: ReqService,
    @InjectRepository(TaskEnt)
    private dataSource: DataSource,
  ) {}

  // async checkExpirationTask(
  //   user_info: any,
  //   expiredTaskPageDto: ExpiredTaskPageDto,
  //   query: QueryRunner | undefined,
  // ): Promise<PageDto<TaskEnt>> {
  //   const queryBuilder = this.dataSource.manager.createQueryBuilder(
  //     TaskEnt,
  //     'task',
  //   );

  //   if (user_info.Tasks.Task_type == 'USER') {
  //     console.log('here');
  //     queryBuilder.where('task.head_id = :head_id', {
  //       head_id: user_info.id_User,
  //     });
  //   }
  //   queryBuilder
  //     // .where(`task.create_at > ( NOW() - new Date((task.create_at).setDate((task.create_at).getDay()+ task.duration))`)
  //     .select([
  //       'task.id',
  //       'task.title',
  //       'task.priority',
  //       'task.head_id',
  //       'task.type',
  //       'task.status',
  //     ]);
  //   console.log(await queryBuilder.getMany());

  //   if (expiredTaskPageDto.base) {
  //     const row = expiredTaskPageDto.base.row;
  //     const skip = PublicFunc.skipRow(
  //       expiredTaskPageDto.base.page,
  //       expiredTaskPageDto.base.row,
  //     );
  //     queryBuilder.skip(skip).take(row);
  //   }
  //   if (expiredTaskPageDto.filter) {
  //   }
  //   if (expiredTaskPageDto.field) {
  //     const mapper = TaskMapperPagination[expiredTaskPageDto.field];
  //     if (!mapper)
  //       throw new Error(
  //         `${JSON.stringify({
  //           section: 'public',
  //           value: 'Column Not Exist',
  //         })}`,
  //       );
  //     queryBuilder.addOrderBy(
  //       `${TaskMapperPagination[expiredTaskPageDto.field]}`,
  //       expiredTaskPageDto.base.order,
  //     );
  //   }
  //   const result = await queryBuilder.getManyAndCount();
  //   const pageMetaDto = new PageMetaDto({
  //     baseOptionsDto: expiredTaskPageDto.base,
  //     itemCount: result[1],
  //   });
  //   console.log(result[0]);

  //   return new PageDto(result[0], pageMetaDto);
  // }

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
        'task.title',
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
      .leftJoinAndSelect('task.user', 'user')
      .where('(user.id = :id_user) AND (task.status = :status)', {
        id_user,
        status: reportPage.filter.status,
      })
      .select([
        'task.id',
        'task.title',
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
    const queryBuilder = await this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .innerJoinAndSelect('task.department_rl', 'department_rl')
      .innerJoinAndSelect('department_rl.req', 'req')
      .where('department_rl.id = :id_department', {
        id_department: createDto.id_department_rl,
      })
      .getOne();

    if (queryBuilder.department_rl.req.status !== StatusReqEnum.OPEN) {
      queryBuilder.department_rl.req.status = StatusReqEnum.OPEN;
      await this.dataSource.manager.save(queryBuilder.department_rl.req);
    }

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
    taskEnt.title = createDto.title;
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
    createDto.projectEnt = await this.projectService.findOneProject(
      createDto.id_project,
    );
    if (!createDto.id_req)
      createDto.reqEnt = await this.reqService.findDefaultReq();
    else createDto.reqEnt = await this.reqService.findOneReq(createDto.id_req);
    createDto.departmentRlEnt =
      await this.departmentRlService.findByDepartmentRequest(
        createDto.id_req,
        createDto.id_user.uid,
      );

    const queryBuilder = await this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .innerJoinAndSelect('task.department_rl', 'department_rl')
      .innerJoinAndSelect('department_rl.req', 'req')
      .where('department_rl.id = :id_department', {
        id_department: createDto.id_department_rl,
      })
      .getOne();

    if (queryBuilder.department_rl.req.status !== StatusReqEnum.OPEN) {
      queryBuilder.department_rl.req.status = StatusReqEnum.OPEN;
      await this.dataSource.manager.save(queryBuilder.department_rl.req);
    }

    const taskEnt = new TaskEnt();
    taskEnt.head_id = createDto.head_id;
    taskEnt.user = createDto.userEnt;
    taskEnt.department_rl = createDto.departmentRlEnt;
    taskEnt.priority = createDto.priority;
    taskEnt.title = createDto.title;
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
    entity.title = updateDto.title;
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
        'task.title',
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
      if (pageDto.filter.title) {
        queryBuilder.andWhere('task.title LIKE :title', {
          title: `%${pageDto.filter.title}%`,
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
    const queryBuilder = await this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .innerJoinAndSelect('task.department_rl', 'department_rl')
      .innerJoinAndSelect('department_rl.req', 'req')
      .where('department_rl.id = :id_department', {
        id_department: createDto.id_department_rl,
      })
      .getOne();

    if (queryBuilder.department_rl.req.status !== StatusReqEnum.OPEN) {
      queryBuilder.department_rl.req.status = StatusReqEnum.OPEN;
      await this.dataSource.manager.save(queryBuilder.department_rl.req);
    }
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
    taskEnt.title = createDto.title;
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
    const queryBuilder = await this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .innerJoinAndSelect('task.department_rl', 'department_rl')
      .innerJoinAndSelect('department_rl.req', 'req')
      .where('department_rl.id = :id_department', {
        id_department: createDto.id_department_rl,
      })
      .getOne();

    if (queryBuilder.department_rl.req.status !== StatusReqEnum.OPEN) {
      queryBuilder.department_rl.req.status = StatusReqEnum.OPEN;
      await this.dataSource.manager.save(queryBuilder.department_rl.req);
    }

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
    taskEnt.title = createDto.title;
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
      { type: TypeTaskEnum.FORWARD },
    );

    const srcTask = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: id_prevoise_task },
    });

    const refTask = new TaskEnt();
    refTask.head_id = createDto.head_id;
    refTask.priority = createDto.priority;
    refTask.title = createDto.title;
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
      `select *,(select u.username  from "user" u  where u.id = t."userId") from task as t where DATE(t.do_date) >= CURRENT_DATE AND DATE(t.do_date) < CURRENT_DATE + INTERVAL '1 DAY' `,
    );
  }

  async createTaskWithIdReqAnddUser(
    id_user: string,
    id_req: string,
    createDto: CreateTaskDto,
    query: QueryRunner | undefined,
  ): Promise<TaskEnt> {
    const queryBuilder = await this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .innerJoinAndSelect('task.department_rl', 'department_rl')
      .innerJoinAndSelect('department_rl.req', 'req')
      .where('department_rl.id = :id_department', {
        id_department: createDto.id_department_rl,
      })
      .getOne();

    if (queryBuilder.department_rl.req.status !== StatusReqEnum.OPEN) {
      queryBuilder.department_rl.req.status = StatusReqEnum.OPEN;
      await this.dataSource.manager.save(queryBuilder.department_rl.req);
    }

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
    taskEnt.title = createDto.title;
    taskEnt.duration = createDto.duration;
    taskEnt.status = createDto.status;
    taskEnt.type = createDto.type;
    taskEnt.user = user;
    taskEnt.department_rl = department_rl;
    if (query) return await query.manager.save(taskEnt);
    return await this.dataSource.manager.save(taskEnt);
  }

  async findAllPendingTask(): Promise<TaskEnt[]> {
    return await this.dataSource.manager.find(TaskEnt, {
      where: { status: StatusTaskEnum.PENDING },
    });
  }

  async updateStatusTask(
    id_task: string,
    status: StatusTaskEnum,
    query?: QueryRunner,
  ): Promise<TaskEnt> {
    if (status === StatusTaskEnum.CANCEL || status === StatusTaskEnum.DONE) {
      const req = await this.dataSource.manager
        .createQueryBuilder(ReqEnt, 'req')
        .leftJoinAndSelect('req.department_rls', 'department_rls')
        .leftJoinAndSelect('department_rls.tasks', 'tasks')
        .where(
          'task.id = :id_task AND (tasks.status != :statusCancel OR tasks.status != :statusDone)',
          {
            id_task,
            statusCancel: StatusTaskEnum.CANCEL,
            statusDone: StatusTaskEnum.DONE,
          },
        )
        .getMany();
      console.log(req);
      if (!req) {
        const result = await this.dataSource.manager
          .createQueryBuilder(ReqEnt, 'req')
          .leftJoinAndSelect('req.department_rls', 'department_rls')
          .leftJoinAndSelect('department_rls.tasks', 'tasks')

          .where(
            'task.id = :id_task AND (tasks.status != :statusCancel OR tasks.status != :statusDone)',
            {
              id_task,
              statusCancel: StatusTaskEnum.CANCEL,
              statusDone: StatusTaskEnum.DONE,
            },
          )
          .update(ReqEnt)
          .set({
            status: StatusReqEnum.DONE,
          })
          .execute();
        console.log('result', result);
      }
    }
    const entity = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: id_task },
    });
    entity.status = status;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async paginationStatusTypeTask(
    id_user: string,
    pageDto: TaskTypeStatusPageDto,
    query: QueryRunner | undefined,
  ): Promise<PageDto<TaskEnt>> {
    console.log(id_user);

    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .leftJoinAndSelect('task.user', 'user')
      .where('task.status = :status', {
        status: pageDto.filter.status,
      })
      .andWhere('task.type = :type', { type: pageDto.filter.type })
      .andWhere('user.id = :id_user', { id_user })
      .select([
        'task.id',
        'task.title',
        'task.priority',
        'task.head_id',
        'task.type',
        'task.status',
      ]);
    console.log(queryBuilder.getSql());

    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.type) {
      }
      // queryBuilder.andWhere('Task.type LIKE :type', {
      //   type: `%${pageDto.filter.type}%`,
      // });
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
    console.log(result[0]);

    return new PageDto(result[0], pageMetaDto);
  }

  async changeStatusToSuccess(
    id_user: string,
    id_task: string,
    query?: QueryRunner,
  ): Promise<TaskEnt> {
    const req = await this.dataSource.manager
      .createQueryBuilder(ReqEnt, 'req')
      .leftJoinAndSelect('req.department_rls', 'department_rls')
      .leftJoinAndSelect('department_rls.tasks', 'tasks')
      .where(
        'tasks.id = :id_task AND (tasks.status != :statusCancel OR tasks.status != :statusDone)',
        {
          id_task,
          statusCancel: StatusTaskEnum.CANCEL,
          statusDone: StatusTaskEnum.DONE,
        },
      )
      .getMany();
    if (!req) {
      const result = await this.dataSource.manager
        .createQueryBuilder(ReqEnt, 'req')
        .leftJoinAndSelect('req.department_rls', 'department_rls')
        .leftJoinAndSelect('department_rls.tasks', 'tasks')
        .where(
          'tasks.id = :id_task AND (tasks.status != :statusCancel OR tasks.status != :statusDone)',
          {
            id_task,
            statusCancel: StatusTaskEnum.CANCEL,
            statusDone: StatusTaskEnum.DONE,
          },
        )
        .update(ReqEnt)
        .set({
          status: StatusReqEnum.DONE,
        })
        .execute();
      console.log('result', result);
    }

    const checkTask = this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .leftJoinAndSelect('user.task', 'task')
      .where('(task.id = :id_task) AND (user.id = :id_user)', {
        id_task,
        id_user,
      });
    // .getOne();
    console.log(id_user);
    console.log(id_task);
    console.log(await checkTask.getOne());
    console.log(checkTask.getSql());

    if (!(await checkTask.getOne()))
      throw new HttpException(
        'This task is not for this user',
        HttpStatus.FORBIDDEN,
      );
    const entity = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: id_task },
    });
    entity.status = StatusTaskEnum.DONE;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async changeStatusToPending(
    id_user: string,
    id_task: string,
    query?: QueryRunner,
  ): Promise<TaskEnt> {
    const checkTask = await this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .leftJoinAndSelect('user.task', 'task')
      .where('task.id = :id_task AND user.id = :id_user', { id_task, id_user })
      .getOne();
    if (!checkTask)
      throw new HttpException(
        'This task is not for this user',
        HttpStatus.FORBIDDEN,
      );
    const entity = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: id_task },
    });
    entity.status = StatusTaskEnum.PENDING;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async allExpirationTask(
    pageDto: TaskPageDto,
    query: QueryRunner | undefined,
  ): Promise<PageDto<TaskEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .where(`(NOW() - task.do_date) > (task.duration * '1 sec'::interval)`);
    console.log(queryBuilder.getSql());

    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.type) {
        queryBuilder.andWhere('task.type = :type', {
          type: `%${pageDto.filter.type}%`,
        });
      }
      if (pageDto.filter.priority) {
        queryBuilder.andWhere('task.priority LIKE :priority', {
          priority: `%${pageDto.filter.priority}%`,
        });
      }
      if (pageDto.filter.title) {
        queryBuilder.andWhere('task.title LIKE :title', {
          title: `%${pageDto.filter.title}%`,
        });
      }
      if (pageDto.filter.type) {
        queryBuilder.andWhere('task.status = :status', {
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
    console.log(result[0]);

    return new PageDto(result[0], pageMetaDto);
  }

  async oneExpirationTask(
    id_user: string,
    pageDto: TaskTypeStatusPageDto,
    query: QueryRunner | undefined,
  ): Promise<PageDto<TaskEnt>> {
    console.log(id_user);

    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .leftJoinAndSelect('task.user', 'user')
      .where('task.status = :status', {
        status: pageDto.filter.status,
      })
      .andWhere('task.type = :type', { type: pageDto.filter.type })
      .andWhere('user.id = :id_user', { id_user })
      .select([
        'task.id',
        'task.title',
        'task.priority',
        'task.head_id',
        'task.type',
        'task.status',
      ]);
    console.log(queryBuilder.getSql());

    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.type) {
      }
      // queryBuilder.andWhere('Task.type LIKE :type', {
      //   type: `%${pageDto.filter.type}%`,
      // });
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
    console.log(result[0]);

    return new PageDto(result[0], pageMetaDto);
  }

  async changeStatusToCheck(
    id_task: string,
    id_user: string,
    updateCheckStatusTaskDto: UpdateCheckStatusTaskDto,
    query?: QueryRunner,
  ) {
    const ckeckTask = await this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .leftJoinAndSelect('task.user', 'user')
      .where('user.id = :id_user', { id_user })
      .getOne();
    console.log(ckeckTask);
    if (!ckeckTask)
      throw new BadRequestException({
        message: 'You can not Update because,This Task is Not for This User',
      });
    const entity = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: id_task },
    });

    entity.status = StatusTaskEnum.CHECK;
    entity.check_status = updateCheckStatusTaskDto.check_status;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async ceateTaskWithIdUserIdReqDto(
    id_req: string,
    id_user: string,
    id_head: string,
    createDto: CreateTaskWithIdUserIdReqDto,
    query?: QueryRunner,
  ): Promise<TaskEnt> {
    const user = await this.dataSource.manager.findOne(UserEnt, {
      where: { id: id_user },
    });

    const department_rl = await this.dataSource.manager
      .createQueryBuilder(DepartmentRlEnt, 'department_rl')
      .leftJoinAndSelect('department_rl.req', 'req')
      .where('req.id = :id_req', { id_req })
      .getOne();
    console.log(department_rl);

    const taskEnt = new TaskEnt();
    taskEnt.head_id = createDto.head_id;
    if (!createDto.priority) taskEnt.priority = '10';
    taskEnt.title = createDto.title;
    taskEnt.head_id = id_head;
    taskEnt.duration = createDto.duration;
    taskEnt.status = StatusTaskEnum.WAITING;
    taskEnt.type = TypeTaskEnum.NEWTASK;
    taskEnt.user = user;
    taskEnt.department_rl = department_rl;
    if (query) return await query.manager.save(taskEnt);
    return await this.dataSource.manager.save(taskEnt);
  }

  async paginationTaskWithCheckStatus(
    id_user: string,
    pageDto: TaskTypeStatusPageDto,
    query: QueryRunner | undefined,
  ): Promise<PageDto<TaskEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(TaskEnt, 'task')
      .where('task.head_id = :id_user AND task.status = :checkstatus', {
        id_user,
        checkstatus: StatusTaskEnum.CHECK,
      });
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
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
    console.log(result[0]);
    return new PageDto(result[0], pageMetaDto);
  }

  async deleteTask(id_task: string) {
    const task = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: id_task },
    });
    task.delete_at = new Date();
    return await this.dataSource.manager.save(task);
  }
}
