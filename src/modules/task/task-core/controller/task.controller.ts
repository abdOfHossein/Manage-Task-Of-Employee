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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { JwtGuard } from 'src/modules/user/modules/auth/guards/jwt.guard';
import { CreateTaskDto } from '../../modules/dtos/create.task.dto';
import { UpdateTaskDto } from '../../modules/dtos/update.task.dto';
import { TaskEnt } from '../../modules/entities/task.entity';
import { ExpiredTaskPageDto } from '../../modules/paginations/expired.task.page.dto';
import { ReportTaskPageDto } from '../../modules/paginations/report.page.dto';
import { TaskTypePageDto } from '../../modules/paginations/task.type.page.dto';
import { TaskService } from '../../modules/services/task.service';
import { GetUser } from "../../../../common/decorates/get.user.decorator";
import { UserResponseJWTDto } from "../../../../common/dtos/user.dto";

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

  @Post('/project')
  createTaskByProject(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user:UserResponseJWTDto,
    @Query('id_project') id_project: string,
  ): Promise<TaskEnt> {
    createTaskDto.id_project = id_project;
    createTaskDto.id_user = user;
    return this.task.createTaskByProject(createTaskDto);
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

  @Get('all')
  paginationTask(): Promise<TaskEnt[]> {
    return this.task.paginationTask();
  }
}
