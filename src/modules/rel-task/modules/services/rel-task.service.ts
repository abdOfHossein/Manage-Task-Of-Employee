import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandlerError } from 'src/common/class/handler.error';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import { StatusTaskEnum } from 'src/modules/task/modules/enums/status-task.enum';  
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateRelTaskDto } from '../dtos/create.rel-task.dto';
import { UpdateRelTaskDto } from '../dtos/update.rel-task.dto';
import { RelTaskEnt } from '../entities/rel-task.entity';
import { RelTaskPageDto } from '../paginations/rel-task.page.dto';
import { RelTaskRepo } from '../repositories/rel-task.repository';

@Injectable()
export class RelTaskService {
  constructor(
    @InjectRepository(RelTaskEnt)
    private dataSource: DataSource,
    private relTaskRepo: RelTaskRepo,
    private handlerService: HandlerService,
  ) {}

  async createRelTask(createDt: CreateRelTaskDto, query?: QueryRunner) {
    try {

      return await this.relTaskRepo.createRelTask(createDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
  }

  async findOneRelTask(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.relTaskRepo.findOneRelTask(searchDto, options);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
  }

  async updateRelTask(
    RelTask_Id: string,
    updateDt: UpdateRelTaskDto,
    query?: QueryRunner,
  ) {
    try {
      const relTaskEnt = await this.dataSource.manager.findOne(RelTaskEnt,{where:{id:RelTask_Id}})
    
      return await this.relTaskRepo.updateRelTask(relTaskEnt, updateDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
  }

  async paginationRelTask(pageDto: RelTaskPageDto) {
    try {
      return await this.relTaskRepo.paginationRelTask(pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e)
      await this.handlerService.handlerException400("FA", result)
    }
  }
}
