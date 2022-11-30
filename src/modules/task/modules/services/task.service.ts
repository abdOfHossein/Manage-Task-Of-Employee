import { Injectable } from '@nestjs/common';
import { FindOneOptions, QueryRunner } from 'typeorm';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { UpdateTaskDto } from '../dtos/update.task.dto';
import { TaskEnt } from '../entities/task.entity';
import { ReportTaskPageDto } from '../paginations/report.page.dto';
import { TaskPageDto } from '../paginations/task.page.dto';
import { TaskRepo } from '../repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepo: TaskRepo) {}

  async getReportTask(
    id_user: string,
    reportPage: ReportTaskPageDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.taskRepo.getReportTask(id_user,reportPage, query);
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

  async paginationTask(pageDto: TaskPageDto) {
    try {
      return await this.taskRepo.paginationTask(pageDto);
    } catch (e) {
      throw e;
    }
  }
}
