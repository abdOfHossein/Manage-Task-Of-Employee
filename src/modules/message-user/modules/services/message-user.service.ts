import { Injectable } from '@nestjs/common';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { QueryRunner } from 'typeorm';
import { MessageUserPageDto } from '../paginations/message-user.page.dto';
import { MessageUserRepo } from '../repositories/message-user.repository';

@Injectable()
export class MessageUserService {
  constructor(
    private messageUserRepo: MessageUserRepo,
    private handlerService: HandlerService,
  ) {}

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
