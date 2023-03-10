import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { CreateProjectDto } from '../../modules/dtos/create.project.dto';
import { UpdateProjectDto } from '../../modules/dtos/update.project.dto';
import { ProjectEnt } from '../../modules/entities/project.entity';
import { ProjectPageDto } from '../../modules/paginations/project.page.dto';
import { ProjectService } from '../../modules/services/project.service';

@ApiTags('Project')
@Controller('Project')
export class ProjectController {
  constructor(private project: ProjectService) {}

  @ApiOperation({ summary: 'create Project' })
  @Post()
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Query('unq_file') unq_file: string,
  ): Promise<ProjectEnt> {
    createProjectDto.unq_file = unq_file;
    return this.project.createProject(createProjectDto);
  }

  @ApiOperation({ summary: 'findOne Project' })
  @Get()
  findOneProject(@Query('id_project') id_project: string): Promise<ProjectEnt> {
    return this.project.findOneProject(id_project);
  }

  @ApiOperation({ summary: 'Get All Projects' })
  @Get('all')
  async getAllProject(): Promise<ProjectEnt[]> {
    return this.project.getAllProject();
  }

  @ApiOperation({ summary: 'update Project' })
  @Put()
  updateProject(
    @Query('id_project') id_project: string,
    @Query('unq_file') unq_file: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEnt> {
    updateProjectDto.unq_file = unq_file;
    return this.project.updateProject(id_project, updateProjectDto);
  }

  @ApiOperation({ summary: 'pagination for Project' })
  @Post('page')
  paginationProject(
    @Body() pageDto: ProjectPageDto,
  ): Promise<PageDto<ProjectEnt>> {
    return this.project.paginationProject(pageDto);
  }

  @ApiOperation({ summary: 'findAll Project of a User based on id_user' })
  @Post('/all/id_user')
  allProjectWithIdUSer(
    @Query('id_user') id_user: string,
  ): Promise<ProjectEnt[]> {
    return this.project.allProjectWithIdUSer(id_user);
  }
  @ApiOperation({
    summary: 'findAll Project with its Total Reqs and Done Reqs',
  })
  @Get('all/withReqs')
  allProjectWithReq(): Promise<ProjectEnt[]> {
    return this.project.allProjectWithReq();
  }

  @ApiOperation({ summary: 'delete Project' })
  @Delete()
  deleteProject(@Query('id_project') id_project: string): Promise<ProjectEnt> {
    return this.project.deleteProject(id_project);
  }
}
