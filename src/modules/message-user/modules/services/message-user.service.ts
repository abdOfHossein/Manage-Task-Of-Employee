import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateMessageUserDto } from '../dtos/create.message-user.dto';
import { UpdateMessageUserDto } from '../dtos/update.message-user.dto';
import { MessageUserEnt } from '../entities/message-user.entity';
import { MessageUserPageDto } from '../paginations/message-user.page.dto';
import { MessageUserRepo } from '../repositories/message-user.repository';

@Injectable()
export class MessageUserService extends AbstractServiceClass<
  MessageUserEnt,
  CreateMessageUserDto,
  UpdateMessageUserDto,
  MessageUserPageDto
> {
  
  public constructor(
    private messageUserRepo: MessageUserRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: MessageUserEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateMessageUserDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: MessageUserEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: MessageUserEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateMessageUserDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: MessageUserEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: MessageUserPageDto) {
    throw new Error('Method not implemented.');
  }

  async deleteMessageUser(id_message_user: string, query?: QueryRunner) {
    try {
      return await this.messageUserRepo.deleteMessageUser(
        id_message_user,
        query,
      );
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async paginationMessageUser(
    id_user: string,
    reportPage: MessageUserPageDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.messageUserRepo.paginationMessageUser(
        id_user,
        reportPage,
        query,
      );
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
