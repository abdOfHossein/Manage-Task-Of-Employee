import { Injectable } from '@nestjs/common';
import { FindOneOptions, QueryRunner } from 'typeorm';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { UpdateTaskDto } from '../dtos/update.task.dto';
import { TaskEnt } from '../entities/task.entity';
import { ExpiredTaskPageDto } from '../paginations/expired.task.page.dto';
import { ReportTaskPageDto } from '../paginations/report.page.dto';
import { TaskTypePageDto } from '../paginations/task.type.page.dto';
import { TaskRepo } from '../repositories/task.repository';
import { ProjectService } from "../../../project/modules/services/project.service";
import { UserService } from "../../../user/modules/services/user.service";
import { ReqService } from "../../../req/modules/services/req.service";
import { DepartmentRlService } from "../../../department-rl/modules/services/department-rl.service";

@Injectable()
export class TaskService {
  constructor(
    private taskRepo: TaskRepo,
    private projectService: ProjectService,
    private reqService: ReqService,
    private departmentRlService: DepartmentRlService
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

  async checkExpirationTask(
    user_info: any,
    expiredTaskPageDto: ExpiredTaskPageDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.checkExpirationTask(
        user_info,
        expiredTaskPageDto,
        query,
      );
    } catch (e) {
      throw e;
    }
  }

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
      createDt.projectEnt = await this.projectService.findOneProject(createDt.id_project);
      if (!createDt.id_req) createDt.reqEnt = await this.reqService.findDefaultReq();
      else createDt.reqEnt = await this.reqService.findOneReq(createDt.id_req);
      createDt.departmentRlEnt = await this.departmentRlService.findByDepartmentRequest(createDt.id_req, createDt.id_user.uid)
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

  async paginationTask() {
    try {
      return await this.taskRepo.paginationTask();
    } catch (e) {
      throw e;
    }
  }
}
