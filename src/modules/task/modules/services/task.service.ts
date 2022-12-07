import { Injectable } from '@nestjs/common';
import { FindOneOptions, QueryRunner } from 'typeorm';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { UpdateTaskDto } from '../dtos/update.task.dto';
import { TaskEnt } from '../entities/task.entity';
import { ExpiredTaskPageDto } from '../paginations/expired.task.page.dto';
import { ReportTaskPageDto } from '../paginations/report.page.dto';
import { TaskTypePageDto } from '../paginations/task.type.page.dto';
import { TaskRepo } from '../repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepo: TaskRepo) {}

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
