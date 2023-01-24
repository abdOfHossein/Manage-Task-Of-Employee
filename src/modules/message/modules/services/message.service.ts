import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateMessageDto } from '../dtos/create.message.dto';
import { UpdateMessageDto } from '../dtos/update.message.dto';
import { MessageEnt } from '../entities/message.entity';
import { MessagePageDto } from '../paginations/message.page.dto';
import { MessageRepo } from '../repositories/message.repository';

@Injectable()
export class MessageService extends AbstractServiceClass<
  MessageEnt,
  CreateMessageDto,
  UpdateMessageDto,
  MessagePageDto
> {
  public constructor(
    private messageRepo: MessageRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }
  
  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: MessageEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateMessageDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: MessageEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: MessageEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateMessageDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: MessageEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: MessagePageDto) {
    throw new Error('Method not implemented.');
  }

  //     return await this.MessageRepo.getReportMessage(id_user, reportPage, query);
  //   } catch (e) {
  //     throw e;
  //   }
  // }
  async createMessage(createDt: CreateMessageDto, query?: QueryRunner) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      await queryRunner.connect();
      return await this.messageRepo.createMessage(createDt, queryRunner);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    } finally {
      await queryRunner.release();
    }
  }

  async delelteMessage(id_message: string, query?: QueryRunner) {
    try {
      return await this.messageRepo.delelteMessage(id_message);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async getUsers() {
    try {
      return await this.messageRepo.getUsers();
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
  // async createMessageByProject(createDt: CreateMessageDto, query?: QueryRunner) {
  //   try {
  //     createDt.projectEnt = await this.projectService.findOneProject(
  //       createDt.id_project,
  //     );
  //     if (!createDt.id_req)
  //       createDt.reqEnt = await this.reqService.findDefaultReq();
  //     else createDt.reqEnt = await this.reqService.findOneReq(createDt.id_req);
  //     createDt.departmentRlEnt =
  //       await this.departmentRlService.findByDepartmentRequest(
  //         createDt.id_req,
  //         createDt.id_user.uid,
  //       );
  //     return await this.MessageRepo.createMessageByProject(createDt, query);
  //   } catch (e) {
  //     throw e;
  //   }
  // }
  // async findOneMessage(searchDto: string, options?: FindOneOptions) {
  //   try {
  //     return await this.MessageRepo.findOneMessage(searchDto, options);
  //   } catch (e) {
  //     throw e;
  //   }
  // }
  // async updateMessage(
  //   Message_Id: string,
  //   updateDt: UpdateMessageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     const MessageEnt = <MessageEnt>await this.findOneMessage(Message_Id);
  //     return await this.MessageRepo.updateMessage(MessageEnt, updateDt, query);
  //   } catch (e) {
  //     throw e;
  //   }
  // }
  // async getAll() {
  //   try {
  //     return await this.MessageRepo.getAll();
  //   } catch (e) {
  //     throw e;
  //   }
  // }
  // async paginationMessage(id_user: string, pageDto: MessagePageDto) {
  //   try {
  //     return await this.MessageRepo.paginationMessage(id_user, pageDto);
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }
  // async createMessageWithIdDepartment(
  //   id_department: string,
  //   createDto: CreateMessageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     return await this.MessageRepo.createMessageWithIdDepartment(
  //       id_department,
  //       createDto,
  //       query,
  //     );
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }
  // async createMessageWithIdDepartmentAndIdReq(
  //   id_req: string,
  //   id_department: string,
  //   createDto: CreateMessageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     return await this.MessageRepo.createMessageWithIdDepartmentAndIdReq(
  //       id_req,
  //       id_department,
  //       createDto,
  //       query,
  //     );
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }
  // async forwardMessage(
  //   id_prevoise_Message: string,
  //   createDto: CreateRelMessageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     if(createDto.status !== StatusMessageEnum.FORWARD){
  //       throw new BadRequestException({message:"Status must be FORWARD"})
  //     }
  //     return await this.MessageRepo.forwardMessage(
  //       id_prevoise_Message,
  //       createDto,
  //       query,
  //     );
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }

  // async MessageTypePagination(
  //   id_user: string,
  //   reportPage: MessageTypePageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     return await this.MessageRepo.MessageTypePagination(id_user, reportPage, query);
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // async checkExpirationMessage(
  //   user_info: any,
  //   expiredMessagePageDto: ExpiredMessagePageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     return await this.MessageRepo.checkExpirationMessage(
  //       user_info,
  //       expiredMessagePageDto,
  //       query,
  //     );
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // async getReportMessage(
  //   id_user: string,
  //   reportPage: ReportMessagePageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     return await this.MessageRepo.getReportMessage(id_user, reportPage, query);
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // async createMessage(createDt: CreateMessageDto, query?: QueryRunner) {
  //   try {
  //     return await this.MessageRepo.createMessage(createDt, query);
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // async createMessageByProject(createDt: CreateMessageDto, query?: QueryRunner) {
  //   try {
  //     createDt.projectEnt = await this.projectService.findOneProject(
  //       createDt.id_project,
  //     );
  //     if (!createDt.id_req)
  //       createDt.reqEnt = await this.reqService.findDefaultReq();
  //     else createDt.reqEnt = await this.reqService.findOneReq(createDt.id_req);
  //     createDt.departmentRlEnt =
  //       await this.departmentRlService.findByDepartmentRequest(
  //         createDt.id_req,
  //         createDt.id_user.uid,
  //       );
  //     return await this.MessageRepo.createMessageByProject(createDt, query);
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // async findOneMessage(searchDto: string, options?: FindOneOptions) {
  //   try {
  //     return await this.MessageRepo.findOneMessage(searchDto, options);
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // async updateMessage(
  //   Message_Id: string,
  //   updateDt: UpdateMessageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     const MessageEnt = <MessageEnt>await this.findOneMessage(Message_Id);
  //     return await this.MessageRepo.updateMessage(MessageEnt, updateDt, query);
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // async getAll() {
  //   try {
  //     return await this.MessageRepo.getAll();
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // async paginationMessage(id_user: string, pageDto: MessagePageDto) {
  //   try {
  //     return await this.MessageRepo.paginationMessage(id_user, pageDto);
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }

  // async createMessageWithIdDepartment(
  //   id_department: string,
  //   createDto: CreateMessageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     return await this.MessageRepo.createMessageWithIdDepartment(
  //       id_department,
  //       createDto,
  //       query,
  //     );
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }

  // async createMessageWithIdDepartmentAndIdReq(
  //   id_req: string,
  //   id_department: string,
  //   createDto: CreateMessageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     return await this.MessageRepo.createMessageWithIdDepartmentAndIdReq(
  //       id_req,
  //       id_department,
  //       createDto,
  //       query,
  //     );
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }

  // async forwardMessage(
  //   id_prevoise_Message: string,
  //   createDto: CreateRelMessageDto,
  //   query?: QueryRunner,
  // ) {
  //   try {
  //     if(createDto.status !== StatusMessageEnum.FORWARD){
  //       throw new BadRequestException({message:"Status must be FORWARD"})
  //     }
  //     return await this.MessageRepo.forwardMessage(
  //       id_prevoise_Message,
  //       createDto,
  //       query,
  //     );
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }
}
