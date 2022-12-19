import { Body, Controller, Delete, Get, Post, UseGuards,Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'create Message' })
  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto): Promise<MessageEnt> {
    return this.message.createMessage(createMessageDto);
  }

  @ApiOperation({ summary: 'delelte Message' })
  @Delete()
  delelteMessage(@Query('id_message') id_message:string ) {
    return this.message.delelteMessage(id_message);
  }

  @ApiOperation({ summary: 'findAll Message' })
  @Get()
  getUsers(): Promise<MessageEnt[]> {
    return this.message.getUsers();
  }
}
