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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { CreateRelTaskDto } from 'src/modules/rel-task/modules/dtos/create.rel-task.dto';
import { RelTaskEnt } from 'src/modules/rel-task/modules/entities/rel-task.entity';
import { JwtGuard } from 'src/modules/user/modules/auth/guards/jwt.guard';
import { GetUser } from '../../../../common/decorates/get.user.decorator';
import { UserResponseJWTDto } from '../../../../common/dtos/user.dto';
import { CreateTaskDto } from '../../modules/dtos/create.message.dto';
import { UpdateTaskDto } from '../../modules/dtos/update.message.dto';
import { TaskEnt } from '../../modules/entities/message.entity';
import { ExpiredTaskPageDto } from '../../modules/paginations/expired.task.page.dto';
import { ReportTaskPageDto } from '../../modules/paginations/report.page.dto';
import { TaskPageDto } from '../../modules/paginations/message.page.dto';
import { TaskTypePageDto } from '../../modules/paginations/task.type.page.dto';
import { TaskService } from '../../modules/services/message.service';

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
    @GetUser() user: UserResponseJWTDto,
    @Query('id_project') id_project: string,
  ): Promise<TaskEnt> {
    createTaskDto.id_project = id_project;
    createTaskDto.id_user = user;
    return this.task.createTaskByProject(createTaskDto);
  }

  @Post('/taskStatusReport')
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
  getAll(): Promise<TaskEnt[]> {
    return this.task.getAll();
  }

  @Post('page')
  paginationRole(
    @Body() pageDto: TaskPageDto,
    @Req() req: any,
  ): Promise<PageDto<TaskEnt>> {
    return this.task.paginationTask(req.user.id_User, pageDto);
  }

  @Post('createTask/id_department')
  createDepartmentRl(
    @Query('id_department') id_department: string,
    @Body() createDto: CreateTaskDto,
  ): Promise<TaskEnt> {
    return this.task.createTaskWithIdDepartment(id_department, createDto);
  }

  @ApiQuery({
    name: 'id_req',
    required: false,
  })
  @Post('createTask/id_department/id_req')
  createTaskWithIdDepartmentAndIdReq(
    @Query('id_department') id_department: string,
    @Query('id_req') id_req: string,
    @Body() createDto: CreateTaskDto,
  ): Promise<TaskEnt> {
    return this.task.createTaskWithIdDepartmentAndIdReq(id_req,id_department,createDto);
  }

  @Post('createTask/forward')
  forwardTask(
    @Query('id_prevoise_task') id_prevoise_task: string,
    @Body() createDto: CreateRelTaskDto,
  ): Promise<RelTaskEnt> {
    return this.task.forwardTask(id_prevoise_task,createDto);
  }
}
