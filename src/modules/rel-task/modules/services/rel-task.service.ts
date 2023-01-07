import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import { StatusTaskEnum } from 'src/modules/task/modules/enums/status-task.enum';  
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
  ) {}

  async createRelTask(createDt: CreateRelTaskDto, query?: QueryRunner) {
    try {

      return await this.relTaskRepo.createRelTask(createDt, query);
    } catch (e) {
      throw e;
    }
  }

  async findOneRelTask(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.relTaskRepo.findOneRelTask(searchDto, options);
    } catch (e) {
      throw e;
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
      throw e;
    }
  }

  async paginationRelTask(pageDto: RelTaskPageDto) {
    try {
      return await this.relTaskRepo.paginationRelTask(pageDto);
    } catch (e) {
      throw e;
    }
  }
}
