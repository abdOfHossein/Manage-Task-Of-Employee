import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRelTaskDto } from 'src/modules/rel-task/modules/dtos/create.rel-task.dto';
import { FindOneOptions, QueryRunner } from 'typeorm';
import { DepartmentRlService } from '../../../department-rl/modules/services/department-rl.service';
import { ProjectService } from '../../../project/modules/services/project.service';
import { ReqService } from '../../../req/modules/services/req.service';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { CreateTaskWithIdUserIdReqDto } from '../dtos/create.task.withIdUserIdReq.dto';
import { UpdateCheckStatusTaskDto } from '../dtos/update.check-status.dto';
import { UpdateTaskDto } from '../dtos/update.task.dto';
import { TaskEnt } from '../entities/task.entity';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { TypeTaskEnum } from '../enums/type-task.enum';
import { ReportTaskPageDto } from '../paginations/report.page.dto';
import { TaskPageDto } from '../paginations/task.page.dto';
import { TaskTypeStatusPageDto } from '../paginations/task.status-type.page.dto';
import { TaskTypePageDto } from '../paginations/task.type.page.dto';
import { TaskRepo } from '../repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(
    private taskRepo: TaskRepo,
    private projectService: ProjectService,
    private reqService: ReqService,
    private departmentRlService: DepartmentRlService,
  ) {}

  async taskTypePagination(
    id_user: string,
    reportPage: TaskTypePageDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.taskTypePagination(id_user, reportPage, query);
    } catch (e) {
      throw e;
    }
  }

  // async checkExpirationTask(
  //   user_info: any,
  //   expiredTaskPageDto: ExpiredTaskPageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     return await this.taskRepo.checkExpirationTask(
  //       user_info,
  //       expiredTaskPageDto,
  //       query,
  //     );
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  async getReportTask(
    id_user: string,
    reportPage: ReportTaskPageDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.getReportTask(id_user, reportPage, query);
    } catch (e) {
      throw e;
    }
  }

  async createTask(createDt: CreateTaskDto, query?: QueryRunner) {
    try {
      return await this.taskRepo.createTask(createDt, query);
    } catch (e) {
      throw e;
    }
  }

  async createTaskByProject(createDt: CreateTaskDto, query?: QueryRunner) {
    try {
      createDt.projectEnt = await this.projectService.findOneProject(
        createDt.id_project,
      );
      if (!createDt.id_req)
        createDt.reqEnt = await this.reqService.findDefaultReq();
      else createDt.reqEnt = await this.reqService.findOneReq(createDt.id_req);
      createDt.departmentRlEnt =
        await this.departmentRlService.findByDepartmentRequest(
          createDt.id_req,
          createDt.id_user.uid,
        );
      return await this.taskRepo.createTaskByProject(createDt, query);
    } catch (e) {
      throw e;
    }
  }

  async findOneTask(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.taskRepo.findOneTask(searchDto, options);
    } catch (e) {
      throw e;
    }
  }

  async updateTask(
    Task_Id: string,
    updateDt: UpdateTaskDto,
    query?: QueryRunner,
  ) {
    try {
      const taskEnt = <TaskEnt>await this.findOneTask(Task_Id);
      return await this.taskRepo.updateTask(taskEnt, updateDt, query);
    } catch (e) {
      throw e;
    }
  }

  async getAll() {
    try {
      return await this.taskRepo.getAll();
    } catch (e) {
      throw e;
    }
  }

  async paginationTask(id_user: string, pageDto: TaskPageDto) {
    try {
      return await this.taskRepo.paginationTask(id_user, pageDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async createTaskWithIdDepartment(
    id_department: string,
    createDto: CreateTaskDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.createTaskWithIdDepartment(
        id_department,
        createDto,
        query,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async dailyTask(): Promise<TaskEnt[]> {
    try {
      return await this.taskRepo.dailyTask();
    } catch (error) {
      console.log(error);
    }
  }

  async createTaskWithIdDepartmentAndIdReq(
    id_user: string,
    id_req: string,
    createDto: CreateTaskDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.createTaskWithIdDepartmentAndIdReq(
        id_user,
        id_req,
        createDto,
        query,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async forwardTask(
    id_prevoise_task: string,
    createDto: CreateRelTaskDto,
    query?: QueryRunner,
  ) {
    try {
      if (createDto.type !== TypeTaskEnum.FORWARD) {
        throw new BadRequestException({ message: 'type must be FORWARD' });
      }
      return await this.taskRepo.forwardTask(
        id_prevoise_task,
        createDto,
        query,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async createTaskWithIdReqAnddUser(
    id_user: string,
    id_req: string,
    createDto: CreateTaskDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.createTaskWithIdReqAnddUser(
        id_user,
        id_req,
        createDto,
        query,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAllPendingTask() {
    try {
      return await this.taskRepo.findAllPendingTask();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateStatusTask(
    id_task: string,
    status: StatusTaskEnum,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.updateStatusTask(id_task, status, query);
    } catch (e) {
      throw e;
    }
  }

  async paginationStatusTypeTask(
    id_user: string,
    pageDto: TaskTypeStatusPageDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.paginationStatusTypeTask(
        id_user,
        pageDto,
        query,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeStatusToPending(
    id_user: string,
    id_task: string,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.changeStatusToPending(id_user, id_task, query);
    } catch (e) {
      throw e;
    }
  }
  async changeStatusToSuccess(
    id_user: string,
    id_task: string,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.changeStatusToSuccess(id_user, id_task, query);
    } catch (e) {
      throw e;
    }
  }

  async allExpirationTask(pageDto: TaskPageDto, query?: QueryRunner) {
    try {
      return await this.taskRepo.allExpirationTask(pageDto, query);
    } catch (e) {
      throw e;
    }
  }

  async oneExpirationTask(
    id_user: string,
    pageDto: TaskPageDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.oneExpirationTask(id_user, pageDto, query);
    } catch (e) {
      throw e;
    }
  }

  async changeStatusToCheck(
    id_task:string,
    id_user: string,
    updateCheckStatusTaskDto: UpdateCheckStatusTaskDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.changeStatusToCheck(
        id_task,
        id_user,
        updateCheckStatusTaskDto,
        query,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async ceateTaskWithIdUserIdReqDto(
    id_req: string,
    id_user: string,
    id_head: string,
    ceateTaskWithIdUserIdReqDto: CreateTaskWithIdUserIdReqDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.ceateTaskWithIdUserIdReqDto(
        id_req,
        id_user,
        id_head,
        ceateTaskWithIdUserIdReqDto,
        query,
      );
    } catch (e) {
      throw e;
    }
  }
}
