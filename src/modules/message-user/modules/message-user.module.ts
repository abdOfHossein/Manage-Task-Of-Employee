import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { MessageUserEnt } from './entities/message-user.entity';
import { MessageUserRepo } from './repositories/message-user.repository';
import { MessageUserService } from './services/message-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageUserEnt])],
  providers: [
    MessageUserService,
    MessageUserRepo,
    HandlerService,
    TranslateService,
  ],
  exports: [MessageUserService],
})
export class MessageUserModule {}
