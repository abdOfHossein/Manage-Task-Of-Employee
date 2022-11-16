import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateTaskBlockOperationDto } from '../dtos/create.task-block-operation.dto';
import { UpdateTaskBlockOperationDto } from '../dtos/update.task-block-operation.dto';
import { TaskBlockOperationEnt } from '../entities/task-block-operation.entity';
import { TaskBlockOperationMapperPagination } from '../mapper/task-block-operation.mapper.pagination';
import { TaskBlockOperationPageDto } from '../paginations/task-block-operation.page.dto';

export class TaskBlockOperationRepo {
  constructor(
    @InjectRepository(TaskBlockOperationEnt)
    private dataSource: DataSource,
  ) {}

  async createTaskBlockOperation(
    createDto: CreateTaskBlockOperationDto,
    query: QueryRunner | undefined,
  ): Promise<TaskBlockOperationEnt> {
    const taskBlockOperationEnt = new TaskBlockOperationEnt();
    taskBlockOperationEnt.name_task_block_operation =
      createDto.name_task_block_operation;
    taskBlockOperationEnt.desription_task_block_operation =
      createDto.desription_task_block_operation;
    taskBlockOperationEnt.task = createDto.taskEnt;
    if (query) return await query.manager.save(taskBlockOperationEnt);
    return await this.dataSource.manager.save(taskBlockOperationEnt);
  }

  async findOneTaskBlockOperation(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<TaskBlockOperationEnt> {
    const taskBlockOperation = await this.dataSource.manager.findOne(
      TaskBlockOperationEnt,
      {
        where: { id: searchDto },
      },
    );
    if (!taskBlockOperation)
      throw new BadGatewayException({
        message: 'TaskBlockOperation does not exits',
      });
    return taskBlockOperation;
  }

  async updateTaskBlockOperation(
    entity: TaskBlockOperationEnt,
    updateDto: UpdateTaskBlockOperationDto,
    query?: QueryRunner,
  ): Promise<TaskBlockOperationEnt> {
    entity.name_task_block_operation = updateDto.name_task_block_operation;
    entity.desription_task_block_operation =
      updateDto.desription_task_block_operation;
    entity.task = updateDto.taskEnt;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async paginationTaskBlockOperation(
    pageDto: TaskBlockOperationPageDto,
  ): Promise<PageDto<TaskBlockOperationEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(TaskBlockOperationEnt, 'task_block_operation')
      .select([
        'task_block_operation.id',
        'task_block_operation.name_task_block_operation',
        'task_block_operation.desription_task_block_operation',
      ]);
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.name_task_block_operation) {
        queryBuilder.andWhere(
          'task_block_operation.name_task_block_operation LIKE :name_task_block_operation',
          {
            name_task_block_operation: `%${pageDto.filter.name_task_block_operation}%`,
          },
        );
      }
      if (pageDto.filter.desription_task_block_operation) {
        queryBuilder.andWhere(
          'task_block_operation.desription_task_block_operation LIKE :desription_task_block_operation',
          {
            desription_task_block_operation: `%${pageDto.filter.desription_task_block_operation}%`,
          },
        );
      }
    }
    if (pageDto.field) {
      const mapper = TaskBlockOperationMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${TaskBlockOperationMapperPagination[pageDto.field]}`,
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
