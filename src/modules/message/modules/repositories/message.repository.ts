import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { MessageUserEnt } from 'src/modules/message-user/modules/entities/message-user.entity';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateMessageDto } from '../dtos/create.message.dto';
import { MessageEnt } from '../entities/message.entity';
import { RecieveTypeMessageEnum } from '../enum/recieve.type.message.enum';

export class MessageRepo {
  constructor(
    @InjectRepository(MessageEnt)
    @InjectRepository(MessageUserEnt)
    private dataSource: DataSource,
  ) {}

  // async checkExpirationMessage(
  //   user_info: any,
  //   expiredMessagePageDto: ExpiredMessagePageDto,
  //   query: QueryRunner | undefined,
  // ): Promise<PageDto<MessageEnt>> {
  //   const queryBuilder = this.dataSource.manager.createQueryBuilder(
  //     MessageEnt,
  //     'Message',
  //   );

  //   if (user_info.Messages.Message_type == 'USER') {
  //     console.log('here');
  //     queryBuilder.where('Message.head_id = :head_id', {
  //       head_id: user_info.id_User,
  //     });
  //   }
  //   queryBuilder
  //     // .where(`Message.create_at > ( NOW() - new Date((Message.create_at).setDate((Message.create_at).getDay()+ Message.duration))`)
  //     .select([
  //       'Message.id',
  //       'Message.title',
  //       'Message.priority',
  //       'Message.head_id',
  //       'Message.type',
  //       'Message.status',
  //     ]);
  //   console.log(await queryBuilder.getMany());

  //   if (expiredMessagePageDto.base) {
  //     const row = expiredMessagePageDto.base.row;
  //     const skip = PublicFunc.skipRow(
  //       expiredMessagePageDto.base.page,
  //       expiredMessagePageDto.base.row,
  //     );
  //     queryBuilder.skip(skip).take(row);
  //   }
  //   if (expiredMessagePageDto.filter) {
  //   }
  //   if (expiredMessagePageDto.field) {
  //     const mapper = MessageMapperPagination[expiredMessagePageDto.field];
  //     if (!mapper)
  //       throw new Error(
  //         `${JSON.stringify({
  //           section: 'public',
  //           value: 'Column Not Exist',
  //         })}`,
  //       );
  //     queryBuilder.addOrderBy(
  //       `${MessageMapperPagination[expiredMessagePageDto.field]}`,
  //       expiredMessagePageDto.base.order,
  //     );
  //   }
  //   const result = await queryBuilder.getManyAndCount();
  //   const pageMetaDto = new PageMetaDto({
  //     baseOptionsDto: expiredMessagePageDto.base,
  //     itemCount: result[1],
  //   });
  //   console.log(result[0]);

  //   return new PageDto(result[0], pageMetaDto);
  // }

  // async MessageTypePagination(
  //   id_user: string,
  //   reportPage: MessageTypePageDto,
  //   query: QueryRunner | undefined,
  // ): Promise<PageDto<MessageEnt>> {
  //   console.log(id_user);

  //   const queryBuilder = this.dataSource.manager
  //     .createQueryBuilder(MessageEnt, 'Message')
  //     .where('Message.head_id = :head_id', { head_id: id_user })
  //     .select([
  //       'Message.id',
  //       'Message.title',
  //       'Message.priority',
  //       'Message.head_id',
  //       'Message.type',
  //       'Message.status',
  //     ]);
  //   console.log(await queryBuilder.getMany());

  //   if (reportPage.base) {
  //     const row = reportPage.base.row;
  //     const skip = PublicFunc.skipRow(
  //       reportPage.base.page,
  //       reportPage.base.row,
  //     );
  //     queryBuilder.skip(skip).take(row);
  //   }
  //   if (reportPage.filter) {
  //     if (reportPage.filter.type)
  //       queryBuilder.andWhere('Message.type LIKE :type', {
  //         type: `%${reportPage.filter.type}%`,
  //       });
  //   }
  //   if (reportPage.field) {
  //     const mapper = MessageMapperPagination[reportPage.field];
  //     if (!mapper)
  //       throw new Error(
  //         `${JSON.stringify({
  //           section: 'public',
  //           value: 'Column Not Exist',
  //         })}`,
  //       );
  //     queryBuilder.addOrderBy(
  //       `${MessageMapperPagination[reportPage.field]}`,
  //       reportPage.base.order,
  //     );
  //   }
  //   const result = await queryBuilder.getManyAndCount();
  //   const pageMetaDto = new PageMetaDto({
  //     baseOptionsDto: reportPage.base,
  //     itemCount: result[1],
  //   });
  //   console.log(result[0]);

  //   return new PageDto(result[0], pageMetaDto);
  // }

  // async getReportMessage(
  //   id_user: string,
  //   reportPage: ReportMessagePageDto,
  //   query: QueryRunner | undefined,
  // ): Promise<PageDto<MessageEnt>> {
  //   console.log(id_user);

  //   const queryBuilder = this.dataSource.manager
  //     .createQueryBuilder(MessageEnt, 'Message')
  //     .where('Message.head_id = :head_id', { head_id: id_user })
  //     .select([
  //       'Message.id',
  //       'Message.title',
  //       'Message.priority',
  //       'Message.head_id',
  //       'Message.type',
  //       'Message.status',
  //     ]);
  //   console.log(await queryBuilder.getMany());

  //   if (reportPage.base) {
  //     const row = reportPage.base.row;
  //     const skip = PublicFunc.skipRow(
  //       reportPage.base.page,
  //       reportPage.base.row,
  //     );
  //     queryBuilder.skip(skip).take(row);
  //   }
  //   if (reportPage.filter) {
  //     if (reportPage.filter.status)
  //       queryBuilder.andWhere('Message.status LIKE :status', {
  //         status: `%${reportPage.filter.status}%`,
  //       });
  //   }
  //   if (reportPage.field) {
  //     const mapper = MessageMapperPagination[reportPage.field];
  //     if (!mapper)
  //       throw new Error(
  //         `${JSON.stringify({
  //           section: 'public',
  //           value: 'Column Not Exist',
  //         })}`,
  //       );
  //     queryBuilder.addOrderBy(
  //       `${MessageMapperPagination[reportPage.field]}`,
  //       reportPage.base.order,
  //     );
  //   }
  //   const result = await queryBuilder.getManyAndCount();
  //   const pageMetaDto = new PageMetaDto({
  //     baseOptionsDto: reportPage.base,
  //     itemCount: result[1],
  //   });
  //   console.log(result[0]);

  //   return new PageDto(result[0], pageMetaDto);
  // }

  async createMessage(
    createDto: CreateMessageDto,
    query: QueryRunner | undefined,
  ): Promise<MessageEnt> {
    const messageEnt = new MessageEnt();
    messageEnt.to = createDto.to;
    messageEnt.title = createDto.title;
    messageEnt.content = createDto.content;
    messageEnt.recieve_type = createDto.recieve_type;
    messageEnt.publish_date = createDto.publish_date;
    messageEnt.message_type = createDto.message_type;
    let result: MessageEnt;
    if (query) {
      console.log('hereeeeeeeeeeeeeeeeeeeeeee');

      result = await query.manager.save(messageEnt);
    } else {
      result = await this.dataSource.manager.save(messageEnt);
    }
    if (createDto.recieve_type === RecieveTypeMessageEnum.USERS) {
      for (const id_user of createDto.to) {
        const message_user = new MessageUserEnt();
        message_user.user_id = id_user;
        message_user.message = messageEnt;
        if (query) {
          await query.manager.save(message_user);
        } else {
          await this.dataSource.manager.save(message_user);
        }
      }
    } else if (createDto.recieve_type === RecieveTypeMessageEnum.DEPARTMENT) {
      for (const id_department of createDto.to) {
        const users = await this.dataSource.manager
          .createQueryBuilder(DepartmentEnt, 'department')
          .where('department.id = :id_department', { id_department })
          .leftJoinAndSelect('department.users', 'users')
          .getMany();
        console.log('in recieve_type==DEPARTMENT');
        console.log(users);
        for (const user of users) {
          const message_user = new MessageUserEnt();
          message_user.user_id = user.id;
          message_user.message = messageEnt;
          if (query) {
            await query.manager.save(message_user);
          } else {
            await this.dataSource.manager.save(message_user);
          }
        }
      }
    } else {
      const users = await this.dataSource.manager.find(UserEnt, {});
      for (const user of users) {
        const message_user = new MessageUserEnt();
        message_user.user_id = user.id;
        message_user.message = messageEnt;
        if (query) {
          await query.manager.save(message_user);
        } else {
          await this.dataSource.manager.save(message_user);
        }
      }
    }
    await query.commitTransaction();
    console.log('result', result);
    return result;
  }

  // async createMessageByProject(
  //   createDto: CreateMessageDto,
  //   query: QueryRunner | undefined,
  // ) {
  //   const MessageEnt = new MessageEnt();
  //   MessageEnt.head_id = createDto.head_id;
  //   MessageEnt.user = createDto.userEnt;
  //   MessageEnt.department_rl = createDto.departmentRlEnt;
  //   MessageEnt.priority = createDto.priority;
  //   MessageEnt.title = createDto.title;
  //   MessageEnt.duration = createDto.duration;
  //   MessageEnt.status = createDto.status;
  //   MessageEnt.type = createDto.type;
  //   if (query) return await query.manager.save(MessageEnt);
  //   return await this.dataSource.manager.save(MessageEnt);
  // }

  async getUsers(): Promise<MessageEnt[]> {
    const message = await this.dataSource.manager.find(MessageEnt, {});
    return message;
  }

  async delelteMessage(id_message: string) {
    const messageEnt = await this.dataSource.manager.findOne(MessageEnt, {
      where: { id: id_message },
    });
    messageEnt.delete_at = new Date();
    messageEnt.title = 'deleted' + '_' + messageEnt.title;
    return await this.dataSource.manager.save(messageEnt);
  }
  // async updateMessage(
  //   entity: MessageEnt,
  //   updateDto: UpdateMessageDto,
  //   query?: QueryRunner,
  // ): Promise<MessageEnt> {
  //   entity.head_id = updateDto.head_id;
  //   entity.priority = updateDto.priority;
  //   entity.title = updateDto.title;
  //   entity.duration = updateDto.duration;
  //   entity.status = updateDto.status;
  //   entity.type = updateDto.type;
  //   if (query) return await query.manager.save(entity);
  //   return await this.dataSource.manager.save(entity);
  // }

  // async getAll(): Promise<MessageEnt[]> {
  //   return await this.dataSource.manager.find(MessageEnt, {});
  // }

  // async paginationMessage(
  //   id_user: string,
  //   pageDto: MessagePageDto,
  // ): Promise<PageDto<MessageEnt>> {
  //   const queryBuilder = this.dataSource.manager
  //     .createQueryBuilder(MessageEnt, 'Message')
  //     .where('Message.head_id = :head_id', { head_id: id_user })
  //     .select([
  //       'Message.id',
  //       'Message.priority',
  //       'Message.title',
  //       'Message.head_id',
  //       'Message.type',
  //       'Message.duration',
  //       'Message.status',
  //     ]);
  //   if (pageDto.base) {
  //     const row = pageDto.base.row;
  //     const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
  //     queryBuilder.skip(skip).take(row);
  //   }
  //   if (pageDto.filter) {
  //     if (pageDto.filter.priority) {
  //       queryBuilder.andWhere('Message.priority LIKE :priority', {
  //         priority: `%${pageDto.filter.priority}%`,
  //       });
  //     }
  //     if (pageDto.filter.title) {
  //       queryBuilder.andWhere('Message.title LIKE :title', {
  //         title: `%${pageDto.filter.title}%`,
  //       });
  //     }
  //     if (pageDto.filter.type) {
  //       queryBuilder.andWhere('Message.type LIKE :type', {
  //         type: `%${pageDto.filter.type}%`,
  //       });
  //     }
  //     if (pageDto.filter.status) {
  //       queryBuilder.andWhere('Message.status LIKE :status', {
  //         status: `%${pageDto.filter.status}%`,
  //       });
  //     }
  //   }
  //   if (pageDto.field) {
  //     const mapper = MessageMapperPagination[pageDto.field];
  //     if (!mapper)
  //       throw new Error(
  //         `${JSON.stringify({
  //           section: 'public',
  //           value: 'Column Not Exist',
  //         })}`,
  //       );
  //     queryBuilder.addOrderBy(
  //       `${MessageMapperPagination[pageDto.field]}`,
  //       pageDto.base.order,
  //     );
  //   }
  //   const result = await queryBuilder.getManyAndCount();
  //   const pageMetaDto = new PageMetaDto({
  //     baseOptionsDto: pageDto.base,
  //     itemCount: result[1],
  //   });
  //   return new PageDto(result[0], pageMetaDto);
  // }

  // async createMessageWithIdDepartment(
  //   id_department: string,
  //   createDto: CreateMessageDto,
  //   query: QueryRunner | undefined,
  // ): Promise<MessageEnt> {
  //   const req = await this.dataSource.manager.findOne(ReqEnt, {
  //     where: { isDefault: true },
  //   });
  //   console.log(req);

  //   const department = await this.dataSource.manager.findOne(DepartmentEnt, {
  //     where: { id: id_department },
  //   });
  //   console.log(department);

  //   const department_rl = await this.dataSource.manager
  //     .createQueryBuilder(DepartmentRlEnt, 'department_rl_ent')
  //     .where(
  //       'department_rl_ent.department = :department AND department_rl_ent.req = :req',
  //       { department: department.id, req: req.id },
  //     )
  //     .getOne();

  //   console.log('department_rl in repo', department_rl);

  //   const MessageEnt = new MessageEnt();
  //   MessageEnt.head_id = createDto.head_id;
  //   MessageEnt.priority = createDto.priority;
  //   MessageEnt.title = createDto.title;
  //   MessageEnt.duration = createDto.duration;
  //   MessageEnt.status = createDto.status;
  //   MessageEnt.type = createDto.type;
  //   if (query) return await query.manager.save(MessageEnt);
  //   return await this.dataSource.manager.save(MessageEnt);
  // }

  // async createMessageWithIdDepartmentAndIdReq(
  //   id_req: string,
  //   id_department: string,
  //   createDto: CreateMessageDto,
  //   query: QueryRunner | undefined,
  // ): Promise<MessageEnt> {
  //   console.log(id_req);

  //   let req: ReqEnt;
  //   if (!id_req) {
  //     req = await this.dataSource.manager.findOne(ReqEnt, {
  //       where: { isDefault: true },
  //     });
  //     console.log('req1', req);
  //   }
  //   req = await this.dataSource.manager.findOne(ReqEnt, {
  //     where: { id: id_req },
  //   });
  //   console.log('req2', req);
  //   const department = await this.dataSource.manager.findOne(DepartmentEnt, {
  //     where: { id: id_department },
  //   });
  //   console.log(department);

  //   const department_rl = await this.dataSource.manager
  //     .createQueryBuilder(DepartmentRlEnt, 'department_rl_ent')
  //     .where(
  //       'department_rl_ent.department = :department AND department_rl_ent.req = :req',
  //       { department: department.id, req: req.id },
  //     )
  //     .getOne();

  //   console.log('department_rl in repo', department_rl);

  //   const MessageEnt = new MessageEnt();
  //   MessageEnt.head_id = createDto.head_id;
  //   MessageEnt.priority = createDto.priority;
  //   MessageEnt.title = createDto.title;
  //   MessageEnt.duration = createDto.duration;
  //   MessageEnt.status = createDto.status;
  //   MessageEnt.type = createDto.type;
  //   if (query) return await query.manager.save(MessageEnt);
  //   return await this.dataSource.manager.save(MessageEnt);
  // }

  // async forwardMessage(
  //   id_prevoise_Message: string,
  //   createDto: CreateRelMessageDto,
  //   query: QueryRunner | undefined,
  // ) {
  //   await this.dataSource.manager.update(
  //     MessageEnt,
  //     { id: id_prevoise_Message },
  //     { status: StatusMessageEnum.FORWARD },
  //   );

  //   const srcMessage = await this.dataSource.manager.findOne(MessageEnt, {
  //     where: { id: id_prevoise_Message },
  //   });

  //   const refMessage = new MessageEnt();
  //   refMessage.head_id = createDto.head_id;
  //   refMessage.priority = createDto.priority;
  //   refMessage.title = createDto.title;
  //   refMessage.duration = createDto.duration;
  //   refMessage.status = createDto.status;
  //   refMessage.type = createDto.type;
  //   if (query) await query.manager.save(refMessage);
  //   await this.dataSource.manager.save(refMessage);

  //   const MessageRlEnt = new RelMessageEnt();
  //   MessageRlEnt.src = srcMessage;
  //   MessageRlEnt.ref = refMessage;
  //   MessageRlEnt.comment = createDto.comment;
  //   if (query) return await query.manager.save(MessageRlEnt);
  //   return await this.dataSource.manager.save(MessageRlEnt);
  // }
}
