import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/user/modules/auth/guards/jwt.guard';
import { MessageUserService } from '../../modules/services/message-user.service';

@ApiTags('MessageUser')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('MessageUser')
export class MessageUserController {
  constructor(private MessageUser: MessageUserService) {}

  // @Post('/checkExpirationMessageUser')
  // checkExpirationMessageUser(
  //   @Body() expiredMessageUserPageDto: ExpiredMessageUserPageDto,
  //   @Req() req: any,
  // ): Promise<PageDto<MessageUserEnt>> {
  //   console.log(req.user);
  //   return this.MessageUser.checkExpirationMessageUser(req.user, expiredMessageUserPageDto);
  // }

  // @Post()
  // createMessageUser(@Body() createMessageUserDto: CreateMessageUserDto): Promise<MessageUserEnt> {
  //   return this.MessageUser.createMessageUser(createMessageUserDto);
  // }

  // @Post('/project')
  // createMessageUserByProject(
  //   @Body() createMessageUserDto: CreateMessageUserDto,
  //   @GetUser() user: UserResponseJWTDto,
  //   @Query('id_project') id_project: string,
  // ): Promise<MessageUserEnt> {
  //   createMessageUserDto.id_project = id_project;
  //   createMessageUserDto.id_user = user;
  //   return this.MessageUser.createMessageUserByProject(createMessageUserDto);
  // }

  // @Post('/MessageUserStatusReport')
  // reportsMessageUserStatus(
  //   @Body() reportDto: ReportMessageUserPageDto,
  //   @Req() req: any,
  // ): Promise<PageDto<MessageUserEnt>> {
  //   return this.MessageUser.getReportMessageUser(req.user.id_User, reportDto);
  // }

  // @Post('/MessageUserTypeReport')
  // MessageUserTypePagination(
  //   @Body() reportDto: MessageUserTypePageDto,
  //   @Req() req: any,
  // ): Promise<PageDto<MessageUserEnt>> {
  //   return this.MessageUser.MessageUserTypePagination(req.user.id_User, reportDto);
  // }

  // @Get()
  // findOneMessageUser(@Query('id_MessageUser') id_MessageUser: string): Promise<MessageUserEnt> {
  //   return this.MessageUser.findOneMessageUser(id_MessageUser);
  // }

  // @Put()
  // updateMessageUser(
  //   @Query('id_MessageUser') id_MessageUser: string,
  //   @Body() updateMessageUserDto: UpdateMessageUserDto,
  // ): Promise<MessageUserEnt> {
  //   return this.MessageUser.updateMessageUser(id_MessageUser, updateMessageUserDto);
  // }

  // @Get('all')
  // getAll(): Promise<MessageUserEnt[]> {
  //   return this.MessageUser.getAll();
  // }

  // @Post('page')
  // paginationRole(
  //   @Body() pageDto: MessageUserPageDto,
  //   @Req() req: any,
  // ): Promise<PageDto<MessageUserEnt>> {
  //   return this.MessageUser.paginationMessageUser(req.user.id_User, pageDto);
  // }

  // @Post('createMessageUser/id_department')
  // createDepartmentRl(
  //   @Query('id_department') id_department: string,
  //   @Body() createDto: CreateMessageUserDto,
  // ): Promise<MessageUserEnt> {
  //   return this.MessageUser.createMessageUserWithIdDepartment(id_department, createDto);
  // }

  // @ApiQuery({
  //   name: 'id_req',
  //   required: false,
  // })
  // @Post('createMessageUser/id_department/id_req')
  // createMessageUserWithIdDepartmentAndIdReq(
  //   @Query('id_department') id_department: string,
  //   @Query('id_req') id_req: string,
  //   @Body() createDto: CreateMessageUserDto,
  // ): Promise<MessageUserEnt> {
  //   return this.MessageUser.createMessageUserWithIdDepartmentAndIdReq(id_req,id_department,createDto);
  // }

  // @Post('createMessageUser/forward')
  // forwardMessageUser(
  //   @Query('id_prevoise_MessageUser') id_prevoise_MessageUser: string,
  //   @Body() createDto: CreateRelMessageUserDto,
  // ): Promise<RelMessageUserEnt> {
  //   return this.MessageUser.forwardMessageUser(id_prevoise_MessageUser,createDto);
  // }
}
