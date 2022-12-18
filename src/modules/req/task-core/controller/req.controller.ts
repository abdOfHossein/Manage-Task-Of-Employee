import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { ProjectEnt } from 'src/modules/project/modules/entities/project.entity';
import { CreateReqDto } from '../../modules/dtos/create.req.dto';
import { UpdateReqDto } from '../../modules/dtos/update.req.dto';
import { ReqEnt } from '../../modules/entities/req.entity';
import { ReqPageDto } from '../../modules/paginations/req.page.dto';
import { ReqService } from '../../modules/services/req.service';

@ApiTags('Req')
@Controller('Req')
export class ReqController {
  constructor(private req: ReqService) {}

  @Post()
  createReq(
    @Query('project_id') project_id: string,
    @Body() createReqDto: CreateReqDto,
  ): Promise<ReqEnt> {
    createReqDto.project_id = project_id;
    return this.req.createReq(createReqDto);
  }

  @Get()
  findOneReq(@Query('id_req') id_req: string): Promise<ReqEnt> {
    return this.req.findOneReq(id_req);
  }

  @Get('all')
  findAllReq(): Promise<ReqEnt[]> {
    return this.req.findAllReq();
  }

  @Get('all/id_project')
  findAllReqWithIdProject(@Query('id_project') id_project:string): Promise<ReqEnt[]> {
    return this.req.findAllReqWithIdProject(id_project);
  }
  @Put()
  updateReq(
    @Query('id_req') id_req: string,
    @Query('project_id') project_id: string,
    @Body() updateReqDto: UpdateReqDto,
  ): Promise<ReqEnt> {
    updateReqDto.project_id = project_id;
    return this.req.updateReq(id_req, updateReqDto);
  }

  @ApiOperation({ summary: 'pagination for Req' })
  @Post('page')
  paginationReq(@Body() pageDto: ReqPageDto): Promise<PageDto<ReqEnt>> {
    return this.req.paginationReq(pageDto);
  }

  @Post('page/id_project')
  getAllReqAndTask(@Query('id_project') id_project:string,@Body() pageDto: ReqPageDto): Promise<PageDto<ProjectEnt>> {
    return this.req.getAllReqAndTask(id_project,pageDto);
  }
}
