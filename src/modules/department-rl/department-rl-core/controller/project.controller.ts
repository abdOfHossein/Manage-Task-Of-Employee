import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { CreateDepartmentRlDto } from '../../modules/dtos/create.department-rl.dto';
import { UpdateDepartmentRlDto } from '../../modules/dtos/update.department-rl.dto';
import { DepartmentRlEnt } from '../../modules/entities/department-rl.entity';
import { DepartmentRlPageDto } from '../../modules/paginations/department-rl.page.dto';
import { DepartmentRlService } from '../../modules/services/department-rl.service';

@ApiTags('DepartmentRl')
@Controller('DepartmentRl')
export class DepartmentRlController {
  constructor(private departmentRl: DepartmentRlService) {}

  @Post()
  createDepartmentRl(
    @Query('req_id') req_id: string,
    @Query('department_id') department_id: string,
    @Body() createDepartmentRlDto: CreateDepartmentRlDto,
  ): Promise<DepartmentRlEnt> {
    createDepartmentRlDto.req_id = req_id;
    createDepartmentRlDto.department_id = department_id;
    return this.departmentRl.createDepartmentRl(createDepartmentRlDto);
  }

  @Get('/')
  findOneDepartmentRl(
    @Query('id_departmentRl') id_departmentRl: string,
  ): Promise<DepartmentRlEnt> {
    return this.departmentRl.findOneDepartmentRl(id_departmentRl);
  }

  @Put()
  updateDepartmentRl(
    @Query('id_DepartmentRl') id_DepartmentRl: string,
    @Query('req_id') req_id: string,
    @Query('department_id') department_id: string,
    @Body() updateDepartmentRlDto: UpdateDepartmentRlDto,
  ): Promise<DepartmentRlEnt> {
    updateDepartmentRlDto.req_id = req_id;
    updateDepartmentRlDto.department_id = department_id;
    return this.departmentRl.updateDepartmentRl(
      id_DepartmentRl,
      updateDepartmentRlDto,
    );
  }

  @ApiOperation({ summary: 'pagination for DepartmentRl' })
  @Post('page')
  paginationDepartmentRl(
    @Body() pageDto: DepartmentRlPageDto,
  ): Promise<PageDto<DepartmentRlEnt>> {
    return this.departmentRl.paginationDepartmentRl(pageDto);
  }
}
