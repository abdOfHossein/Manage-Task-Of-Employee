import { Module } from '@nestjs/common';
import { MessageUserModule } from '../modules/message-user.module';
import { MessageUserController } from './controller/message-user.controller';

@Module({
  imports: [MessageUserModule],
  controllers: [MessageUserController],
})
export class MessageUserCoreModule {}
