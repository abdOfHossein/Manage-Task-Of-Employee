import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorates/get.user.decorator';
import { PageDto } from 'src/common/dtos/page.dto';
import { UserResponseJWTDto } from 'src/common/dtos/user.dto';
import { JwtGuard } from 'src/modules/user/modules/auth/guards/jwt.guard';
import { CreateDepartmentDto } from '../../modules/dtos/create.department.dto';
import { UpdateDepartmentDto } from '../../modules/dtos/update.department.dto';
import { DepartmentEnt } from '../../modules/entities/department.entity';
import { DepartmentPageDto } from '../../modules/paginations/department.page.dto';
import { DepartmentService } from '../../modules/services/department.service';

@ApiTags('Department')
@Controller('Department')
export class DepartmentController {
  constructor(private department: DepartmentService) {}

  @ApiOperation({ summary: 'create Department' })
  @Post()
  async createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentEnt> {
    return this.department.createDepartment(createDepartmentDto);
  }

  @ApiOperation({ summary: 'findOne Department' })
  @Get()
  async findOneDepartment(
    @Query('id_department') id_department: string,
  ): Promise<DepartmentEnt> {
    return this.department.findOneDepartment(id_department);
  }

  @ApiOperation({ summary: 'findAll Department' })
  @Get('/all')
  @ApiOperation({ summary: 'get all department' })
  async getAllDepartment(): Promise<DepartmentEnt[]> {
    return this.department.getAllDepartment();
  }

  @ApiOperation({ summary: 'get all users in department' })
  @Get('/users')
  async getDepartmentUsers(
    @Query('id_department') id_department: string,
  ): Promise<DepartmentEnt[]> {
    return this.department.getDepartmentUsers(id_department);
  }

  @ApiOperation({ summary: 'update Department' })
  @Put()
  async updateDepartment(
    @Query('id_Department') id_Department: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<DepartmentEnt> {
    return this.department.updateDepartment(id_Department, updateDepartmentDto);
  }

  @ApiOperation({ summary: 'pagination for department' })
  @Post('page')
  paginationDepartment(
    @Body() pageDto: DepartmentPageDto,
  ): Promise<PageDto<DepartmentEnt>> {
    return this.department.paginationDepartment(pageDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'findAll Req of department' })
  @Get('allReq/department')
  allReqOfDepartment(
    @GetUser() user: UserResponseJWTDto,
  ): Promise<DepartmentEnt[]> {
    return this.department.allReqOfDepartment(user.uid);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'findAll Task of department based on jwt' })
  @Get('allTask/department')
  allTaskOfDepartment(
    @GetUser() user: UserResponseJWTDto,
  ): Promise<DepartmentEnt[]> {
    return this.department.allTaskOfDepartment(user.uid);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'findAll Users of department based on jwt' })
  @Get('allUsers/department')
  allUsersOfDepartment(
    @GetUser() user: UserResponseJWTDto,
  ): Promise<DepartmentEnt[]> {
    return this.department.allUsersOfDepartment(user.uid);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'findAll Task of user based on jwt and id_user' })
  @Get('allTask/User')
  allTaskOfUser(
    @Query('id_user') id_user: string,
    @GetUser() user: UserResponseJWTDto,
  ): Promise<DepartmentEnt[]> {
    return this.department.allTaskOfUser(user.uid, id_user);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'findAll Req without Task of department ' })
  @Get('allReq/withoutTask/department')
  allReqWithoutTaskOfDepartment(
    @GetUser() user: UserResponseJWTDto,
  ): Promise<DepartmentEnt[]> {
    console.log('ssss');
    return this.department.allReqWithoutTaskOfDepartment(user.uid);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'findAll Department based on jwt' })
  @Get('allDepartment/OfUser')
  allDepartmentOfUser(
    @GetUser() user: UserResponseJWTDto,
  ): Promise<DepartmentEnt[]> {
    return this.department.allDepartmentOfUser(user.uid);
  }

}
