import { Injectable } from '@nestjs/common';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateTaskBlockOperationDto } from '../dtos/create.task-block-operation.dto';
import { UpdateTaskBlockOperationDto } from '../dtos/update.task-block-operation.dto';
import { TaskBlockOperationEnt } from '../entities/task-block-operation.entity';
import { TaskBlockOperationPageDto } from '../paginations/task-block-operation.page.dto';
import { TaskBlockOperationRepo } from '../repositories/task-block-operation.repository';

@Injectable()
export class TaskBlockOperationService {
  constructor(
    private taskBlockOperationRepo: TaskBlockOperationRepo,
    private dataSource: DataSource,
  ) {}

  async createTaskBlockOperation(
    createDt: CreateTaskBlockOperationDto,
    query?: QueryRunner,
  ) {
    try {

      return await this.taskBlockOperationRepo.createTaskBlockOperation(
        createDt,
        query,
      );
    } catch (e) {
      throw e;
    }
  }

  async findOneTaskBlockOperation(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.taskBlockOperationRepo.findOneTaskBlockOperation(
        searchDto,
        options,
      );
    } catch (e) {
      throw e;
    }
  }

  async updateTaskBlockOperation(
    TaskBlockOperation_Id: string,
    updateDt: UpdateTaskBlockOperationDto,
    query?: QueryRunner,
  ) {
    try {

      const uerEnt = <TaskBlockOperationEnt>(
        await this.findOneTaskBlockOperation(TaskBlockOperation_Id)
      );
      return await this.taskBlockOperationRepo.updateTaskBlockOperation(
        uerEnt,
        updateDt,
        query,
      );
    } catch (e) {
      throw e;
    }
  }

  async paginationTaskBlockOperation(pageDto: TaskBlockOperationPageDto) {
    try {
      return await this.taskBlockOperationRepo.paginationTaskBlockOperation(
        pageDto,
      );
    } catch (e) {
      console.log('pagination TaskBlockOperation err in service', e);
      throw e;
    }
  }
}
