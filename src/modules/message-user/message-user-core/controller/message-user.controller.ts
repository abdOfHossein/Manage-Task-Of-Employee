import { Body, Controller, Delete, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/user/modules/auth/guards/jwt.guard';
import { MessageUserPageDto } from '../../modules/paginations/message-user.page.dto';
import { MessageUserService } from '../../modules/services/message-user.service';

@ApiTags('MessageUser')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('MessageUser')
export class MessageUserController {
  constructor(private MessageUser: MessageUserService) {}

  
  @ApiOperation({ summary: 'delete MessageUser' })
  @Delete()
  deleteMessageUser(@Query('id_messageUser') id_messageUser: string) {
    return this.MessageUser.deleteMessageUser(id_messageUser);
  }

  @ApiOperation({ summary: 'pagination MessageUser' })
  @Post('/page')
  paginationMessageUser(@Query('id_user') id_user: string, @Body() reportPage: MessageUserPageDto) {
    return this.MessageUser.paginationMessageUser(id_user,reportPage);
  }
  
}
