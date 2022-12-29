import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { MessageUserPageDto } from '../paginations/message-user.page.dto';
import { MessageUserRepo } from '../repositories/message-user.repository';

@Injectable()
export class MessageUserService {
  constructor(private messageUserRepo: MessageUserRepo) {}

  async deleteMessageUser(
    id_message_user: string,
    query?: QueryRunner,
  ) {
    try {
      return await this.messageUserRepo.deleteMessageUser(
        id_message_user,
        query,
      );
    } catch (e) {
      throw e;
    }
  }

  async paginationMessageUser(
    id_user: string,
    reportPage: MessageUserPageDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.messageUserRepo.paginationMessageUser(id_user, reportPage, query);
    } catch (e) {
      throw e;
    }
  }

}
