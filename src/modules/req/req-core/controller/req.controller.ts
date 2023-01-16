import {
  Body,
  Controller,
  Delete,
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
import { ProjectEnt } from 'src/modules/project/modules/entities/project.entity';
import { JwtGuard } from 'src/modules/user/modules/auth/guards/jwt.guard';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { RolesGuard } from 'src/modules/user/modules/guard/role.guard';
import { CreateReqDto } from '../../modules/dtos/create.req.dto';
import { DoneReqDto } from '../../modules/dtos/done.req.dto';
import { UpdateReqDto } from '../../modules/dtos/update.req.dto';
import { ReqEnt } from '../../modules/entities/req.entity';
import { ReqPageDto } from '../../modules/paginations/req.page.dto';
import { ReqService } from '../../modules/services/req.service';

@ApiTags('Req')
@Controller('Req')
export class ReqController {
  constructor(private req: ReqService) {}

  @ApiOperation({ summary: 'create req' })
  @Post()
  createReq(@Body() createReqDto: CreateReqDto): Promise<ReqEnt> {
    return this.req.createReq(createReqDto);
  }

  @ApiOperation({ summary: 'findOne req' })
  @Get()
  findOneReq(@Query('id_req') id_req: string): Promise<ReqEnt> {
    return this.req.findOneReq(id_req);
  }

  @ApiOperation({ summary: 'findAll req' })
  @Get('all')
  findAllReq(): Promise<ReqEnt[]> {
    return this.req.findAllReq();
  }

  @ApiOperation({ summary: 'findAll req based on id_project' })
  @Get('all/id_project')
  findAllReqWithIdProject(
    @Query('id_project') id_project: string,
  ): Promise<ReqEnt[]> {
    return this.req.findAllReqWithIdProject(id_project);
  }

  @ApiOperation({ summary: 'update req' })
  @Put()
  updateReq(
    @Query('id_req') id_req: string,
    @Query('project_id') project_id: string,
    @Body() updateReqDto: UpdateReqDto,
  ): Promise<ReqEnt> {
    console.log('id_req', id_req);
    updateReqDto.project_id = project_id;
    return this.req.updateReq(id_req, updateReqDto);
  }

  @ApiOperation({ summary: 'pagination for Req' })
  @Post('page')
  paginationReq(@Body() pageDto: ReqPageDto): Promise<PageDto<ReqEnt>> {
    return this.req.paginationReq(pageDto);
  }

  @ApiOperation({ summary: 'create req based on id_project' })
  @Post('page/id_project')
  getAllReqAndTask(
    @Query('id_project') id_project: string,
    @Body() pageDto: ReqPageDto,
  ): Promise<PageDto<ProjectEnt>> {
    return this.req.getAllReqAndTask(id_project, pageDto);
  }

  @ApiOperation({ summary: 'findAll DoneReq with given limitation' })
  @Post('all/DoneReq')
  getAllDoneReq(@Body() doneReqDto: DoneReqDto): Promise<ReqEnt[]> {
    return this.req.getAllDoneReq(doneReqDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'findAll Req without Task' })
  @Get('allReq/withoutTask')
  allReqWithoutTask(@GetUser() user: UserResponseJWTDto): Promise<UserEnt[]> {
    return this.req.allReqWithoutTask(user.uid);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'findAll Req without Task for Admin' })
  @Get('allReq/withoutTask/admin')
  allReqWithoutTaskAdmin(): Promise<UserEnt[]> {
    return this.req.allReqWithoutTaskAdmin();
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'findAll Req that userId is equal with headerId in Department',
  })
  @Get('allReq/BasedOnUserId')
  allReqBasedOnUserId(@GetUser() user: UserResponseJWTDto): Promise<ReqEnt[]> {
    return this.req.allReqBasedOnUserId(user.uid);
  }

  @ApiOperation({ summary: 'delete Req' })
  @Delete()
  deleteReq(@Query('id_req') id_req: string): Promise<ReqEnt> {
    return this.req.deleteReq(id_req);
  }
}
