import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { BackendEnt } from './entities/backend.entity';
import { BackendRepo } from './repositories/backend.repository';
import { BackendService } from './services/backend.service';

@Module({
  imports: [TypeOrmModule.forFeature([BackendEnt])],
  providers: [BackendService, BackendRepo, HandlerService, TranslateService],
  exports: [BackendService],
})
export class BackendModule {}
