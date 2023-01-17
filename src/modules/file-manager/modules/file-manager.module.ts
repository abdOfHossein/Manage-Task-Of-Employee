import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { FileManagerEnt } from './entities/file-manager.entity';
import { FileManagerRepo } from './repositories/file-manager.repository';
import { FileManagerService } from './services/file-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileManagerEnt])],
  providers: [FileManagerService, FileManagerRepo,HandlerService,TranslateService],
  exports: [FileManagerService],
})
export class FileManagerModule {}
