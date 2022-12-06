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
import { CalenderDto } from '../../modules/dtos/calender.dto';
import { CreateTaskDto } from '../../modules/dtos/create.task.dto';
import { UpdateTaskDto } from '../../modules/dtos/update.task.dto';
import { TaskEnt } from '../../modules/entities/task.entity';
import { CalenderPageDto } from '../../modules/paginations/calender.page.dto';
import { ExpiredTaskPageDto } from '../../modules/paginations/expired.task.page.dto';
import { ReportTaskPageDto } from '../../modules/paginations/report.page.dto';
import { TaskPageDto } from '../../modules/paginations/task.page.dto';
import { TaskTypePageDto } from '../../modules/paginations/task.type.page.dto';
import { TaskService } from '../../modules/services/task.service';

@ApiTags('Task')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('Task')
export class TaskController {
  constructor(private task: TaskService) {}

  @Post('/checkExpirationTask')
  checkExpirationTask(
    @Body() expiredTaskPageDto: ExpiredTaskPageDto,
    @Req() req: any,
  ): Promise<PageDto<TaskEnt>> {
    console.log(req.user);
    return this.task.checkExpirationTask(req.user, expiredTaskPageDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEnt> {
    return this.task.createTask(createTaskDto);
  }

  @Post('/report')
  reportsTaskStatus(
    @Body() reportDto: ReportTaskPageDto,
    @Req() req: any,
  ): Promise<PageDto<TaskEnt>> {
    return this.task.getReportTask(req.user.id_User, reportDto);
  }

  @Post('/taskTypeReport')
  taskTypePagination(
    @Body() reportDto: TaskTypePageDto,
    @Req() req: any,
  ): Promise<PageDto<TaskEnt>> {
    return this.task.taskTypePagination(req.user.id_User, reportDto);
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
  @Get('page')
  paginationTask(): Promise<TaskEnt[]> {
    return this.task.paginationTask();
  }

  @Post('calender')
  Calender(
    @Req() req: any,
    @Body() calenderPageDto: CalenderPageDto,
  ): Promise<PageDto<TaskEnt>> {
    return this.task.calender(req.user.id_User, calenderPageDto);
  }
}
