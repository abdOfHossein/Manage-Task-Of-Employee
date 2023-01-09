import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateReqDto } from '../dtos/create.file-manager.dto';
import { DoneReqDto } from '../dtos/done.file-manager.dto';
import { UpdateReqDto } from '../dtos/update.file-manager.dto';
import { ReqEnt } from '../entities/file-manager.entity';
import { ReqPageDto } from '../paginations/file-manager.page.dto';
import { ReqRepo } from '../repositories/req.repository';

@Injectable()
export class ReqService {
  constructor(private reqRepo: ReqRepo, private dataSource: DataSource) {}

  async createReq(createDt: CreateReqDto, query?: QueryRunner) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      return await this.reqRepo.createReq(createDt, queryRunner);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
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
      console.log(e);
    }
  }
  async findAllReq(): Promise<ReqEnt[]> {
    try {
      return await this.reqRepo.findAllReq();
    } catch (e) {
      throw e;
    }
  }

  async findAllReqWithIdProject(id_project: string): Promise<ReqEnt[]> {
    try {
      return await this.reqRepo.findAllReqWithIdProject(id_project);
    } catch (e) {
      throw e;
    }
  }
  async updateReq(Req_Id: string, updateDt: UpdateReqDto, query?: QueryRunner) {
    try {
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

  async getAllReqAndTask(id_project: string, pageDto: ReqPageDto) {
    try {
      return await this.reqRepo.getAllReqAndTask(id_project, pageDto);
    } catch (e) {
      throw e;
    }
  }

  async getAllDoneReq(doneReqDto: DoneReqDto) {
    try {
      return await this.reqRepo.getAllDoneReq(doneReqDto);
    } catch (e) {
      throw e;
    }
  }

  async allReqWithoutTask(id_user: string) {
    try {
      return await this.reqRepo.allReqWithoutTask(id_user);
    } catch (e) {
      throw e;
    }
  }

  async allReqWithoutTaskAdmin() {
    try {
      return await this.reqRepo.allReqWithoutTaskAdmin();
    } catch (e) {
      throw e;
    }
  }

  async allReqBasedOnUserId(id_user: string) {
    try {
      return await this.reqRepo.allReqBasedOnUserId(id_user);
    } catch (e) {
      throw e;
    }
  }

  async deleteReq(id_req: string) {
    try {
      return await this.reqRepo.deleteReq(id_req);
    } catch (e) {
      throw e;
    }
  }
}
