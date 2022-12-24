import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
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
    @Query('id_department') id_department: string
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

}
