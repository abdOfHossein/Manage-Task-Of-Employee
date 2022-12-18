import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEnt } from './entities/message.entity';
import { MessageRepo } from './repositories/message.repository';
import { MessageService } from './services/message.service';
@Module({
  imports: [TypeOrmModule.forFeature([MessageEnt])],
  providers: [MessageService, MessageRepo],
  exports: [MessageService],
})
export class MessageModule {}
