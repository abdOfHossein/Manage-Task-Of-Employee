import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateReqDto } from '../dtos/create.req.dto';
import { DoneReqDto } from '../dtos/done.req.dto';
import { UpdateReqDto } from '../dtos/update.req.dto';
import { ReqEnt } from '../entities/req.entity';
import { ReqPageDto } from '../paginations/req.page.dto';
import { ReqRepo } from '../repositories/req.repository';

@Injectable()
export class ReqService extends AbstractServiceClass<
  ReqEnt,
  CreateReqDto,
  UpdateReqDto,
  ReqPageDto
> {
  public constructor(
    private reqRepo: ReqRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }
  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: ReqEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateReqDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: ReqEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: ReqEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateReqDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: ReqEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: ReqPageDto) {
    throw new Error('Method not implemented.');
  }

  async createReq(createDt: CreateReqDto, query?: QueryRunner) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      await queryRunner.connect();
      return await this.reqRepo.createReq(createDt, queryRunner);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
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
  async updateReq(id_req: string, updateDt: UpdateReqDto, query?: QueryRunner) {
    try {
      const reqEnt = await this.dataSource.manager.findOne(ReqEnt, {
        where: { id: id_req },
      });
      if (!reqEnt) {
        throw new BadRequestException({
          message: 'Req with this Id does not exist',
        });
      }
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
