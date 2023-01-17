import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { ReqEnt } from './entities/req.entity';
import { ReqRepo } from './repositories/req.repository';
import { ReqService } from './services/req.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReqEnt])],
  providers: [ReqService, ReqRepo, HandlerService, TranslateService],
  exports: [ReqService],
})
export class ReqModule {}
