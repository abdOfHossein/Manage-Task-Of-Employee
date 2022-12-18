import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageUserEnt } from './entities/message-user.entity';
import { MessageUserRepo } from './repositories/message-user.repository';
import { MessageUserService } from './services/message-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageUserEnt])],
  providers: [MessageUserService, MessageUserRepo],
  exports: [MessageUserService],
})
export class MessageUserModule {}
