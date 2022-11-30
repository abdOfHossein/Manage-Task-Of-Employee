import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { JwtGuard } from 'src/modules/user/modules/auth/guards/jwt.guard';
import { CreateTaskDto } from '../../modules/dtos/create.task.dto';
import { UpdateTaskDto } from '../../modules/dtos/update.task.dto';
import { TaskEnt } from '../../modules/entities/task.entity';
import { ReportTaskPageDto } from '../../modules/paginations/report.page.dto';
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

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Post('/report')
  getReports(
    @Body() reportDto: ReportTaskPageDto,
    @Req() req: any,
  ): Promise<PageDto<TaskEnt>> {
    return this.task.getReportTask(req.user.id_User, reportDto);
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
