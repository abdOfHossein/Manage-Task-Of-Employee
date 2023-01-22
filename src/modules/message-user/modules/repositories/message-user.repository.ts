import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { DataSource, QueryRunner } from 'typeorm';
import { MessageUserEnt } from '../entities/message-user.entity';
import { MessageUserMapperPagination } from '../mapper/message-user.mapper.pagination';
import { MessageUserPageDto } from '../paginations/message-user.page.dto';

export class MessageUserRepo {
  constructor(
    @InjectRepository(MessageUserEnt)
    private dataSource: DataSource,
  ) {}

  async deleteMessageUser(id_message_user: string, query?: QueryRunner) {
    const messageUserEnt = await this.dataSource.manager.findOne(MessageUserEnt, {
      where: { id: id_message_user },
    });
    messageUserEnt.delete_at = new Date();
    // messageUserEnt.title = 'deleted' + '_' + messageUserEnt.title;
    return await this.dataSource.manager.save(messageUserEnt);
  }

  async paginationMessageUser(
    id_user: string,
    pageDto: MessageUserPageDto,
    query?: QueryRunner,
  ): Promise<PageDto<MessageUserEnt>> {
    await this.dataSource.manager
      .createQueryBuilder(MessageUserEnt, 'message_user')
      .update()
      .set({ seen: () => 'seen + 1' })
      .execute();
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(MessageUserEnt, 'message_user')
      .where('message_user.user_id = :user_id', { user_id: id_user });
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.publish_date) {
        queryBuilder.andWhere('message_user.publish_date LIKE :publish_date', {
          publish_date: `%${pageDto.filter.publish_date}%`,
        });
      }
      if (pageDto.filter.content) {
        queryBuilder.andWhere('message_user.content LIKE :content', {
          content: `%${pageDto.filter.content}%`,
        });
      }
      if (pageDto.filter.seen) {
        queryBuilder.andWhere('message_user.seen LIKE :seen', {
          seen: `%${pageDto.filter.seen}%`,
        });
      }
    }
    if (pageDto.field) {
      const mapper = MessageUserMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${MessageUserMapperPagination[pageDto.field]}`,
        pageDto.base.order,
      );
    }
    const result = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      baseOptionsDto: pageDto.base,
      itemCount: result[1],
    });
    return new PageDto(result[0], pageMetaDto);
  }
}
