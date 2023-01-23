import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateTaskBlockOperationDto } from '../dtos/create.task-block-operation.dto';
import { UpdateTaskBlockOperationDto } from '../dtos/update.task-block-operation.dto';
import { TaskBlockOperationEnt } from '../entities/task-block-operation.entity';
import { TaskBlockOperationPageDto } from '../paginations/task-block-operation.page.dto';
import { TaskBlockOperationRepo } from '../repositories/task-block-operation.repository';

@Injectable()
export class TaskBlockOperationService extends AbstractServiceClass<
  TaskBlockOperationEnt,
  CreateTaskBlockOperationDto,
  UpdateTaskBlockOperationDto,
  TaskBlockOperationPageDto
> {
  public constructor(
    private taskBlockOperationRepo: TaskBlockOperationRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }
  
  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: TaskBlockOperationEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateTaskBlockOperationDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: TaskBlockOperationEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: TaskBlockOperationEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(role_Id: string, updateDt: UpdateTaskBlockOperationDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: TaskBlockOperationEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: TaskBlockOperationPageDto) {
    throw new Error('Method not implemented.');
  }


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
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async findOneTaskBlockOperation(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.taskBlockOperationRepo.findOneTaskBlockOperation(
        searchDto,
        options,
      );
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
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
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async paginationTaskBlockOperation(pageDto: TaskBlockOperationPageDto) {
    try {
      return await this.taskBlockOperationRepo.paginationTaskBlockOperation(
        pageDto,
      );
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
