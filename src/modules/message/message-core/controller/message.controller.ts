import { Body, Controller, Delete, Get, Post, UseGuards,Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/user/modules/auth/guards/jwt.guard';
import { CreateMessageDto } from '../../modules/dtos/create.message.dto';
import { MessageEnt } from '../../modules/entities/message.entity';
import { MessageService } from '../../modules/services/message.service';

@ApiTags('Message')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('Message')
export class MessageController {
  constructor(private message: MessageService) {}

  // @Post('/checkExpirationMessage')
  // checkExpirationMessage(
  //   @Body() expiredMessagePageDto: ExpiredMessagePageDto,
  //   @Req() req: any,
  // ): Promise<PageDto<MessageEnt>> {
  //   console.log(req.user);
  //   return this.Message.checkExpirationMessage(req.user, expiredMessagePageDto);
  // }

  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto): Promise<MessageEnt> {
    return this.message.createMessage(createMessageDto);
  }

  @Delete()
  delelteMessage(@Query('id_message') id_message:string ) {
    return this.message.delelteMessage(id_message);
  }

  @Get()
  getUsers(): Promise<MessageEnt[]> {
    return this.message.getUsers();
  }
  // @Post('/project')
  // createMessageByProject(
  //   @Body() createMessageDto: CreateMessageDto,
  //   @GetUser() user: UserResponseJWTDto,
  //   @Query('id_project') id_project: string,
  // ): Promise<MessageEnt> {
  //   createMessageDto.id_project = id_project;
  //   createMessageDto.id_user = user;
  //   return this.Message.createMessageByProject(createMessageDto);
  // }

  // @Post('/MessageStatusReport')
  // reportsMessageStatus(
  //   @Body() reportDto: ReportMessagePageDto,
  //   @Req() req: any,
  // ): Promise<PageDto<MessageEnt>> {
  //   return this.Message.getReportMessage(req.user.id_User, reportDto);
  // }

  // @Post('/MessageTypeReport')
  // MessageTypePagination(
  //   @Body() reportDto: MessageTypePageDto,
  //   @Req() req: any,
  // ): Promise<PageDto<MessageEnt>> {
  //   return this.Message.MessageTypePagination(req.user.id_User, reportDto);
  // }

  // @Get()
  // findOneMessage(@Query('id_Message') id_Message: string): Promise<MessageEnt> {
  //   return this.Message.findOneMessage(id_Message);
  // }

  // @Put()
  // updateMessage(
  //   @Query('id_Message') id_Message: string,
  //   @Body() updateMessageDto: UpdateMessageDto,
  // ): Promise<MessageEnt> {
  //   return this.Message.updateMessage(id_Message, updateMessageDto);
  // }

  // @Get('all')
  // getAll(): Promise<MessageEnt[]> {
  //   return this.Message.getAll();
  // }

  // @Post('page')
  // paginationRole(
  //   @Body() pageDto: MessagePageDto,
  //   @Req() req: any,
  // ): Promise<PageDto<MessageEnt>> {
  //   return this.Message.paginationMessage(req.user.id_User, pageDto);
  // }

  // @Post('createMessage/id_department')
  // createDepartmentRl(
  //   @Query('id_department') id_department: string,
  //   @Body() createDto: CreateMessageDto,
  // ): Promise<MessageEnt> {
  //   return this.Message.createMessageWithIdDepartment(id_department, createDto);
  // }

  // @ApiQuery({
  //   name: 'id_req',
  //   required: false,
  // })
  // @Post('createMessage/id_department/id_req')
  // createMessageWithIdDepartmentAndIdReq(
  //   @Query('id_department') id_department: string,
  //   @Query('id_req') id_req: string,
  //   @Body() createDto: CreateMessageDto,
  // ): Promise<MessageEnt> {
  //   return this.Message.createMessageWithIdDepartmentAndIdReq(id_req,id_department,createDto);
  // }

  // @Post('createMessage/forward')
  // forwardMessage(
  //   @Query('id_prevoise_Message') id_prevoise_Message: string,
  //   @Body() createDto: CreateRelMessageDto,
  // ): Promise<RelMessageEnt> {
  //   return this.Message.forwardMessage(id_prevoise_Message,createDto);
  // }
}
