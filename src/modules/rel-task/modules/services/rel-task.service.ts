import { Injectable } from '@nestjs/common';
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
    private relTaskRepo: RelTaskRepo,
    private dataSource: DataSource,
  ) {}

  async createRelTask(createDt: CreateRelTaskDto, query?: QueryRunner) {
    try {
      createDt.srcEnt = await this.dataSource
        .getRepository(TaskEnt)
        .findOne({ where: { id: createDt.id_src } });
      createDt.refEnt = await this.dataSource
        .getRepository(TaskEnt)
        .findOne({ where: { id: createDt.id_ref } });
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
      const relTaskEnt = <RelTaskEnt>await this.findOneRelTask(RelTask_Id);
      updateDt.srcEnt = await this.dataSource
        .getRepository(TaskEnt)
        .findOne({ where: { id: updateDt.id_src } });
      await this.dataSource
        .getRepository(TaskEnt)
        .update({ id: updateDt.id_src }, { status: StatusTaskEnum.DONE });
      updateDt.refEnt = await this.dataSource
        .getRepository(TaskEnt)
        .findOne({ where: { id: updateDt.id_ref } });
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
