import { Controller, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/user/modules/auth/guards/jwt.guard';
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
}
