import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MessageUserEnt } from '../entities/message-user.entity';

export class MessageUserRepo {
  constructor(
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
  //       'Message.tittle',
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
  //       'Message.tittle',
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
  //       'Message.tittle',
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

  // async createMessage(
  //   createDto: CreateMessageDto,
  //   query: QueryRunner | undefined,
  // ): Promise<MessageEnt> {
  //   const MessageEnt = new MessageEnt();
  //   MessageEnt.head_id = createDto.head_id;
  //   MessageEnt.priority = createDto.priority;
  //   MessageEnt.tittle = createDto.tittle;
  //   MessageEnt.duration = createDto.duration;
  //   MessageEnt.status = createDto.status;
  //   MessageEnt.type = createDto.type;
  //   if (query) return await query.manager.save(MessageEnt);
  //   return await this.dataSource.manager.save(MessageEnt);
  // }

  // async createMessageByProject(
  //   createDto: CreateMessageDto,
  //   query: QueryRunner | undefined,
  // ) {
  //   const MessageEnt = new MessageEnt();
  //   MessageEnt.head_id = createDto.head_id;
  //   MessageEnt.user = createDto.userEnt;
  //   MessageEnt.department_rl = createDto.departmentRlEnt;
  //   MessageEnt.priority = createDto.priority;
  //   MessageEnt.tittle = createDto.tittle;
  //   MessageEnt.duration = createDto.duration;
  //   MessageEnt.status = createDto.status;
  //   MessageEnt.type = createDto.type;
  //   if (query) return await query.manager.save(MessageEnt);
  //   return await this.dataSource.manager.save(MessageEnt);
  // }

  // async findOneMessage(
  //   searchDto: string,
  //   options?: FindOneOptions,
  // ): Promise<MessageEnt> {
  //   const Message = await this.dataSource.manager.findOne(MessageEnt, {
  //     where: { id: searchDto },
  //   });
  //   if (!Message)
  //     throw new BadGatewayException({ message: 'Message does not exits' });
  //   return Message;
  // }

  // async updateMessage(
  //   entity: MessageEnt,
  //   updateDto: UpdateMessageDto,
  //   query?: QueryRunner,
  // ): Promise<MessageEnt> {
  //   entity.head_id = updateDto.head_id;
  //   entity.priority = updateDto.priority;
  //   entity.tittle = updateDto.tittle;
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
  //       'Message.tittle',
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
  //     if (pageDto.filter.tittle) {
  //       queryBuilder.andWhere('Message.tittle LIKE :tittle', {
  //         tittle: `%${pageDto.filter.tittle}%`,
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
  //   MessageEnt.tittle = createDto.tittle;
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
  //   MessageEnt.tittle = createDto.tittle;
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
  //   refMessage.tittle = createDto.tittle;
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
