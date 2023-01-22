import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { ProjectEnum } from 'src/common/translate/enums/project.enum';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { ProjectEnt } from 'src/modules/project/modules/entities/project.entity';
import { ProjectMapperPagination } from 'src/modules/project/modules/mapper/project.mapper.pagination';
import { StatusTaskEnum } from 'src/modules/task/modules/enums/status-task.enum';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateReqDto } from '../dtos/create.req.dto';
import { DoneReqDto } from '../dtos/done.req.dto';
import { UpdateReqDto } from '../dtos/update.req.dto';
import { ReqEnt } from '../entities/req.entity';
import { StatusReqEnum } from '../enums/req.enum';
import { ReqMapperPagination } from '../mapper/req.mapper.pagination';
import { ReqPageDto } from '../paginations/req.page.dto';

export class ReqRepo {
  constructor(
    @InjectRepository(ReqEnt)
    @InjectRepository(DepartmentRlEnt)
    @InjectRepository(ProjectEnt)
    @InjectRepository(DepartmentRlEnt)
    private dataSource: DataSource,
  ) {}

  async createReq(
    createDto: CreateReqDto,
    query: QueryRunner | undefined,
  ): Promise<ReqEnt> {
    createDto.projectEnt = await this.dataSource.manager.findOne(ProjectEnt, {
      where: { id: createDto.project_id },
    });
    if (!createDto.projectEnt) {
      throw new Error(
        `${JSON.stringify({
          section: 'project',
          value: ProjectEnum.PROJECT_NOT_EXISTS,
        })}`,
      );
    }
    const reqEnt = new ReqEnt();
    reqEnt.status = createDto.status;
    reqEnt.name = createDto.name;
    reqEnt.description = createDto.description;
    reqEnt.project = createDto.projectEnt;
    let result: ReqEnt;
    if (query) {
      result = await query.manager.save(reqEnt);
    } else {
      result = await this.dataSource.manager.save(reqEnt);
    }

    if (createDto.id_departments.length == 0) {
      let departments = await this.dataSource.manager.find(DepartmentEnt, {});
      for (const department of departments) {
        const departmentRl = this.dataSource.manager.create(DepartmentRlEnt, {
          department,
          req: result,
        });
        if (query) {
          await query.manager.save(departmentRl);
        } else {
          await this.dataSource.manager.save(departmentRl);
        }
      }
    }
    for (const id_department of createDto.id_departments) {
      const department = await this.dataSource.manager.findOne(DepartmentEnt, {
        where: { id: id_department },
      });

      console.log('department=====');
      console.log(department);

      const departmentRl = this.dataSource.manager.create(DepartmentRlEnt, {
        department,
        req: result,
      });
      if (query) {
        await query.manager.save(departmentRl);
      } else {
        await this.dataSource.manager.save(departmentRl);
      }
    }
    await query.commitTransaction();

    return result;
  }

  async findOneReq(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<ReqEnt> {
    const req = await this.dataSource.manager.findOne(ReqEnt, {
      where: { id: searchDto },
      relations: {
        project: true,
      },
    });
    if (!req) throw new BadGatewayException({ message: 'Req does not exits' });
    return req;
  }

  async findDefaultReq(): Promise<ReqEnt> {
    const req = await this.dataSource.manager.findOne(ReqEnt, {
      where: { isDefault: true },
      relations: {
        project: true,
      },
    });
    if (!req) throw new BadRequestException({ message: 'Req does not exits' });
    return req;
  }
  async findAllReq(): Promise<ReqEnt[]> {
    return await this.dataSource.manager.find(ReqEnt, {});
  }

  async findAllReqWithIdProject(id_project: string): Promise<ReqEnt[]> {
    return await this.dataSource.manager
      .createQueryBuilder(ReqEnt, 'req')
      .where('req.project.id = :id_project', { id_project })
      .getMany();
  }
  async updateReq(
    entity: ReqEnt,
    updateDto: UpdateReqDto,
    query?: QueryRunner,
  ): Promise<ReqEnt> {
    entity.status = updateDto.status;
    entity.name = updateDto.name;
    entity.description = updateDto.description;
    let result: ReqEnt;
    if (query) {
      result = await query.manager.save(entity);
    } else {
      result = await this.dataSource.manager.save(entity);
    }

    const notDeleted = [];
    const req = await this.dataSource.manager
      .createQueryBuilder(ReqEnt, 'req')
      .where('req.id = :req_id', { req_id: entity.id })
      .leftJoinAndSelect('req.department_rls', 'department_rls')
      .leftJoinAndSelect('department_rls.department', 'department')
      .select(['req.id', 'department_rls', 'department_rls.id', 'department'])
      .getMany();
    console.log('req', req);
    for (const department_rl of req[0].department_rls) {
      if (!updateDto.id_department.includes(department_rl.department.id)) {
        const departmentRlEnt = await this.dataSource.manager
          .createQueryBuilder(DepartmentRlEnt, 'department_rl')
          .where('department_rl.id = :id_department_rl', {
            id_department_rl: department_rl.id,
          })
          .leftJoinAndSelect('department_rl.tasks', 'tasks')
          .getMany();
        console.log('departmentRlEnt', departmentRlEnt);
        if (departmentRlEnt[0].tasks) {
          notDeleted.push(departmentRlEnt);
        } else {
          const deleteDepartmentEl = await this.dataSource.manager.findOne(
            DepartmentRlEnt,
            { where: { id: department_rl.id } },
          );
          deleteDepartmentEl.delete_at = new Date();
        }
      }
    }

    for (const id_department of updateDto.id_department) {
      const department: any = await this.dataSource.manager.findOne(
        DepartmentEnt,
        {
          where: { id: id_department },
        },
      );

      if (!req[0].department_rls.includes(department)) {
        const departmentRl = new DepartmentRlEnt();
        departmentRl.req = result;
        departmentRl.department = department;
      }
    }
    result['failed'] = notDeleted;
    return result;
  }

  async paginationReq(pageDto: ReqPageDto): Promise<PageDto<ReqEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(ReqEnt, 'req')
      .leftJoinAndSelect('req.project', 'project')
      .leftJoinAndSelect('req.department_rls', 'department_rls')
      .leftJoinAndSelect('department_rls.department', 'department');
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.status) {
        queryBuilder.andWhere('req.status LIKE :status', {
          status: `%${pageDto.filter.status}%`,
        });
      }
    }
    if (pageDto.field) {
      const mapper = ReqMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${ReqMapperPagination[pageDto.field]}`,
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

  async getAllReqAndTask(
    id_req: string,
    pageDto: ReqPageDto,
  ): Promise<PageDto<ProjectEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(ProjectEnt, 'project')
      .where('project.id = :id', { id: id_req })
      .leftJoinAndSelect('project.reqs', 'reqs')
      .leftJoinAndSelect('reqs.department_rls', 'department_rls')
      .leftJoinAndSelect('department_rls.tasks', 'tasks');

    console.log(await queryBuilder.getMany());

    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }

    if (pageDto.filter) {
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

  async getAllDoneReq(doneReqDto: DoneReqDto): Promise<ReqEnt[]> {
    return await this.dataSource.manager
      .createQueryBuilder(ReqEnt, 'req')
      .where('req.status = :status', { status: StatusReqEnum.DONE })
      .limit(doneReqDto.limit)
      .orderBy('req.create_at')
      .execute();
  }

  async allReqWithoutTask(id_user: string): Promise<UserEnt[]> {
    const result = await this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('department.department_rls', 'department_rls')
      .leftJoinAndSelect('department_rls.tasks', 'tasks')
      .where(
        'user.id = :id_user AND (tasks.status = :statusCancel OR tasks.status = :statusDone OR tasks.status = :statusPublish)',
        //  and tasks.status = :statusPublish',
        {
          id_user,
          statusDone: StatusTaskEnum.DONE,
          statusCancel: StatusTaskEnum.CANCEL,
          statusPublish: StatusTaskEnum.PUBLISH,
        },
      )
      .getMany();
    return result;
  }

  async allReqWithoutTaskAdmin(): Promise<UserEnt[]> {
    const result = await this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('department.department_rls', 'department_rls')
      .leftJoinAndSelect('department_rls.tasks', 'tasks')
      .where(
        '(tasks.status = :statusCancel OR tasks.status = :statusDone OR tasks.status = :statusPublish)',
        {
          statusDone: StatusTaskEnum.DONE,
          statusCancel: StatusTaskEnum.CANCEL,
          statusPublish: StatusTaskEnum.PUBLISH,
        },
      )
      .getMany();
    console.log(result);
    return result;
  }

  async allReqBasedOnUserId(id_user: string): Promise<ReqEnt[]> {
    const result = await this.dataSource.manager
      .createQueryBuilder(ReqEnt, 'req')
      .leftJoinAndSelect('req.department_rls', 'department_rls')
      .leftJoinAndSelect('department_rls.department', 'department')
      .where('department.header_id = :id_user', {
        id_user,
      })
      .getMany();
    return result;
  }

  async deleteReq(id_req: string) {
    const req = await this.dataSource.manager.findOne(ReqEnt, {
      where: { id: id_req },
    });
    req.delete_at = new Date();
    req.name = 'deleted' + '_' + req.name;
    return await this.dataSource.manager.save(req);
  }
}
