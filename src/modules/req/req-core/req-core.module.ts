import { Module } from '@nestjs/common';
import { ReqModule } from '../modules/req.module';
import { ReqController } from './controller/req.controller';

@Module({
  imports: [ReqModule],
  controllers: [ReqController],
})
export class ReqCoreModule {}
