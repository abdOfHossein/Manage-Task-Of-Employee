import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import { StatusTaskEnum } from 'src/modules/task/modules/enums/status-task.enum';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateRelTaskDto } from '../dtos/create.rel-task.dto';
import { UpdateRelTaskDto } from '../dtos/update.rel-task.dto';
import { RelTaskEnt } from '../entities/rel-task.entity';
import { RelTaskMapperPagination } from '../mapper/rel-task.mapper.pagination';
import { RelTaskPageDto } from '../paginations/rel-task.page.dto';

export class RelTaskRepo {
  constructor(
    @InjectRepository(RelTaskEnt)
    @InjectRepository(TaskEnt)
    private dataSource: DataSource,
  ) {}

  async createRelTask(
    createDto: CreateRelTaskDto,
    query: QueryRunner | undefined,
  ): Promise<RelTaskEnt> {
    createDto.srcEnt = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: createDto.id_src },
    });
    createDto.refEnt = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: createDto.id_ref },
    });
    const relTaskEnt = new RelTaskEnt();
    relTaskEnt.comment = createDto.comment;
    relTaskEnt.src = createDto.srcEnt;
    relTaskEnt.ref = createDto.refEnt;
    if (query) return await query.manager.save(relTaskEnt);
    return await this.dataSource.manager.save(relTaskEnt);
  }

  async findOneRelTask(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<RelTaskEnt> {
    const RelTask = await this.dataSource.manager.findOne(RelTaskEnt, {
      where: { id: searchDto },
    });
    if (!RelTask)
      throw new BadGatewayException({ message: 'RelTask does not exits' });
    return RelTask;
  }

  async updateRelTask(
    entity: RelTaskEnt,
    updateDto: UpdateRelTaskDto,
    query?: QueryRunner,
  ): Promise<RelTaskEnt> {
    updateDto.srcEnt = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: updateDto.id_src },
    });
    await this.dataSource.manager.update(
      TaskEnt,
      { id: updateDto.id_src },
      { status: StatusTaskEnum.DONE },
    );
    updateDto.refEnt = await this.dataSource.manager.findOne(TaskEnt, {
      where: { id: updateDto.id_ref },
    });

    entity.comment = updateDto.comment;
    entity.src = updateDto.srcEnt;
    entity.ref = updateDto.refEnt;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async paginationRelTask(
    pageDto: RelTaskPageDto,
  ): Promise<PageDto<RelTaskEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(RelTaskEnt, 'rel_task')
      .select(['rel_task.id', 'rel_task.comment']);
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.comment)
        queryBuilder.andWhere('RelTask.comment LIKE :comment', {
          comment: `%${pageDto.filter.comment}%`,
        });
    }
    if (pageDto.field) {
      const mapper = RelTaskMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${RelTaskMapperPagination[pageDto.field]}`,
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
