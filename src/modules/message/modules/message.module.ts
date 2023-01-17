import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageUserEnt } from 'src/modules/message-user/modules/entities/message-user.entity';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { MessageEnt } from './entities/message.entity';
import { MessageRepo } from './repositories/message.repository';
import { MessageService } from './services/message.service';
@Module({
  imports: [TypeOrmModule.forFeature([MessageEnt,MessageUserEnt])],
  providers: [MessageService, MessageRepo, HandlerService,TranslateService],
  exports: [MessageService],
})
export class MessageModule {}
