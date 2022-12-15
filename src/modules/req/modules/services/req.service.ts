import { Injectable } from '@nestjs/common';
import { ProjectEnt } from 'src/modules/project/modules/entities/project.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateReqDto } from '../dtos/create.req.dto';
import { UpdateReqDto } from '../dtos/update.req.dto';
import { ReqEnt } from '../entities/req.entity';
import { ReqPageDto } from '../paginations/req.page.dto';
import { ReqRepo } from '../repositories/req.repository';

@Injectable()
export class ReqService {
  constructor(private reqRepo: ReqRepo, private dataSource: DataSource) {}

  async createReq(createDt: CreateReqDto, query?: QueryRunner) {
    try {
      createDt.projectEnt = await this.dataSource
        .getRepository(ProjectEnt)
        .findOne({ where: { id: createDt.project_id } });
      return await this.reqRepo.createReq(createDt, query);
    } catch (e) {
      throw e;
    }
  }

  async findOneReq(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.reqRepo.findOneReq(searchDto, options);
    } catch (e) {
      throw e;
    }
  }

  async findDefaultReq() {
    try {
      return await this.reqRepo.findDefaultReq();
    } catch (e) {

    }
  }

  async updateReq(Req_Id: string, updateDt: UpdateReqDto, query?: QueryRunner) {
    try {
      updateDt.projectEnt = await this.dataSource
        .getRepository(ProjectEnt)
        .findOne({ where: { id: updateDt.project_id } });
      const reqEnt = <ReqEnt>await this.findOneReq(Req_Id);
      return await this.reqRepo.updateReq(reqEnt, updateDt, query);
    } catch (e) {
      throw e;
    }
  }

  async paginationReq(pageDto: ReqPageDto) {
    try {
      return await this.reqRepo.paginationReq(pageDto);
    } catch (e) {
      throw e;
    }
  }
}
