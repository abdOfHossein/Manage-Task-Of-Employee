import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { CreateTaskBlockOperationDto } from '../../modules/dtos/create.task-block-operation.dto';
import { UpdateTaskBlockOperationDto } from '../../modules/dtos/update.task-block-operation.dto';
import { TaskBlockOperationEnt } from '../../modules/entities/task-block-operation.entity';
import { TaskBlockOperationPageDto } from '../../modules/paginations/task-block-operation.page.dto';
import { TaskBlockOperationService } from '../../modules/services/task-block-operation.service';

@ApiTags('TaskBlockOperation')
@Controller('TaskBlockOperation')
export class TaskBlockOperationController {
  constructor(private taskBlockOperation: TaskBlockOperationService) {}

  @ApiOperation({ summary: 'create TaskBlockOperation' })
  @Post()
  createTaskBlockOperation(
    @Query('id_task') id_task: string,
    @Body() createTaskBlockOperationDto: CreateTaskBlockOperationDto,
  ): Promise<TaskBlockOperationEnt> {
    createTaskBlockOperationDto.id_task = id_task;
    return this.taskBlockOperation.createTaskBlockOperation(
      createTaskBlockOperationDto,
    );
  }

  @ApiOperation({ summary: 'findOne TaskBlockOperation' })
  @Get()
  findOneTaskBlockOperation(
    @Query('id_task_block_operation') id_task_block_operation: string,
  ): Promise<TaskBlockOperationEnt> {
    return this.taskBlockOperation.findOneTaskBlockOperation(
      id_task_block_operation,
    );
  }

  @ApiOperation({ summary: 'update TaskBlockOperation' })
  @Put()
  updateTaskBlockOperation(
    @Query('id_task_block_operation') id_task_block_operation: string,
    @Query('id_task') id_task: string,
    @Body() updateTaskBlockOperationDto: UpdateTaskBlockOperationDto,
  ): Promise<TaskBlockOperationEnt> {
    updateTaskBlockOperationDto.id_task = id_task;
    return this.taskBlockOperation.updateTaskBlockOperation(
      id_task_block_operation,
      updateTaskBlockOperationDto,
    );
  }

  @ApiOperation({ summary: 'pagination for TaskBlockOperation' })
  @Post('page')
  paginationTaskBlockOperation(
    @Body() pageDto: TaskBlockOperationPageDto,
  ): Promise<PageDto<TaskBlockOperationEnt>> {
    return this.taskBlockOperation.paginationTaskBlockOperation(pageDto);
  }
}
