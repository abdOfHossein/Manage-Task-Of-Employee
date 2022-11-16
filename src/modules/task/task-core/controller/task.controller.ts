import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { CreateTaskDto } from '../../modules/dtos/create.task.dto';
import { UpdateTaskDto } from '../../modules/dtos/update.task.dto';
import { TaskEnt } from '../../modules/entities/task.entity';
import { TaskPageDto } from '../../modules/paginations/task.page.dto';
import { TaskService } from '../../modules/services/task.service';

@ApiTags('Task')
@Controller('Task')
export class TaskController {
  constructor(private task: TaskService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEnt> {
    return this.task.createTask(createTaskDto);
  }

  @Get()
  findOneTask(@Query('id_task') id_task: string): Promise<TaskEnt> {
    return this.task.findOneTask(id_task);
  }

  @Put()
  updateTask(
    @Query('id_task') id_task: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEnt> {
    return this.task.updateTask(id_task, updateTaskDto);
  }

  @ApiOperation({ summary: 'pagination for Task' })
  @Post('page')
  paginationTask(@Body() pageDto: TaskPageDto): Promise<PageDto<TaskEnt>> {
    return this.task.paginationTask(pageDto);
  }
}
